// order.service.js
const pool = require('../config/db'); // ⚠️ misma duda que en el repository: confirmar si es 'database' o 'db'
const orderRepository = require('../repositories/order.repository');
const productRepository = require('../repositories/product.repository');

class BusinessError extends Error {
  constructor(message) {
    super(message);
    this.isBusinessError = true;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.isForbidden = true;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.isNotFound = true;
  }
}

async function obtenerTodosLosPedidos(estado) {
  return await orderRepository.findAll(estado);
}

async function cambiarEstadoPedido(idPedido, nuevoEstado) {
  const pedido = await orderRepository.findById(idPedido);

  if (!pedido) {
    throw new NotFoundError('Pedido no encontrado.');
  }

  const estadoActual = pedido.estado;

  const transicionesValidas = {
    en_preparacion: 'en_camino',
    en_camino: 'entregado'
  };

  if (transicionesValidas[estadoActual] !== nuevoEstado) {
    throw new BusinessError(
      `No se puede cambiar el estado de "${estadoActual}" a "${nuevoEstado}".`
    );
  }

  const pedidoActualizado = await orderRepository.updateStatus(idPedido, nuevoEstado);

  if (nuevoEstado === 'entregado') {
    await orderRepository.registrarFechaEntrega(idPedido);
  }

  return pedidoActualizado;
}

async function crearPedido({ id_usuario, items, fecha_entrega, franja_horaria }) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let total = 0;
    const detalles = []; // acumulamos para insertar después de validar todo

    for (const item of items) {
      const { id_producto, cantidad } = item;

      // Se asume que product.repository puede recibir un client
      // para participar de la misma transacción (y hacer lock de fila si aplica)
      const producto = await productRepository.obtenerPorId(id_producto, client);

      if (!producto) {
        throw new BusinessError(`El producto ${id_producto} no existe.`);
      }

      if (producto.stock_disponible < cantidad) {
        throw new BusinessError(
          `Stock insuficiente para el producto "${producto.nombre}". Disponible: ${producto.stock_disponible}, solicitado: ${cantidad}.`
        );
      }

      const precio_unitario = producto.precio_venta;
      const subtotal = precio_unitario * cantidad;
      total += subtotal;

      detalles.push({ id_producto, cantidad, precio_unitario, subtotal });
    }

    const pedidoResult = await client.query(
      `INSERT INTO pedidos (id_usuario, fecha_entrega, franja_horaria, total, estado, creado_en)
       VALUES ($1, $2, $3, $4, 'pendiente_pago', NOW())
       RETURNING id_pedido`,
      [id_usuario, fecha_entrega, franja_horaria, total]
    );

    const id_pedido = pedidoResult.rows[0].id_pedido;

    for (const detalle of detalles) {
      await client.query(
        `INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario, subtotal)
         VALUES ($1, $2, $3, $4, $5)`,
        [id_pedido, detalle.id_producto, detalle.cantidad, detalle.precio_unitario, detalle.subtotal]
      );
    }

    await client.query('COMMIT');

    return id_pedido;

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// GET /api/orders/my
async function obtenerPedidosPorUsuario(id_cliente) {
  return await orderRepository.findByClient(id_cliente);
}

// GET /api/orders/:id
async function obtenerDetallePedido(id_pedido, id_cliente) {
  const pedido = await orderRepository.findById(id_pedido);

  if (!pedido) {
    return null;
  }

  if (pedido.id_cliente !== id_cliente) {
    throw new ForbiddenError('No tienes permiso para ver este pedido.');
  }

  return pedido;
}

// PATCH /api/orders/:id/cancel
async function cancelarPedido(id_pedido, id_cliente) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Bloqueamos la fila del pedido para evitar condiciones de carrera
    const pedidoResult = await client.query(
      `SELECT id_pedido, id_cliente, estado
       FROM pedidos
       WHERE id_pedido = $1
       FOR UPDATE`,
      [id_pedido]
    );

    const pedido = pedidoResult.rows[0];

    if (!pedido) {
      throw new NotFoundError('Pedido no encontrado.');
    }

    if (pedido.id_cliente !== id_cliente) {
      throw new ForbiddenError('No tienes permiso para cancelar este pedido.');
    }

    if (pedido.estado !== 'pendiente_pago' && pedido.estado !== 'en_preparacion') {
      throw new BusinessError(
        `No se puede cancelar un pedido en estado "${pedido.estado}".`
      );
    }

    await client.query(
      `UPDATE pedidos SET estado = 'cancelado' WHERE id_pedido = $1`,
      [id_pedido]
    );

    const detalleResult = await client.query(
      `SELECT id_producto, cantidad
       FROM detalle_pedidos
       WHERE id_pedido = $1`,
      [id_pedido]
    );

    for (const item of detalleResult.rows) {
      await client.query(
        `UPDATE productos
         SET stock_disponible = stock_disponible + $1
         WHERE id_producto = $2`,
        [item.cantidad, item.id_producto]
      );

      await client.query(
        `INSERT INTO inventario_movimientos (id_producto, tipo, cantidad, id_pedido, creado_en)
         VALUES ($1, 'devolucion', $2, $3, NOW())`,
        [item.id_producto, item.cantidad, id_pedido]
      );
    }

    await client.query('COMMIT');

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  obtenerTodosLosPedidos,
  cambiarEstadoPedido,
  crearPedido,
  obtenerPedidosPorUsuario,
  obtenerDetallePedido,
  cancelarPedido
};
