// payment.service.js: Logica de simulacion de pago y confirmacion de pedido
const crypto = require('crypto');
const pool = require('../config/db');

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

async function procesarPago(id_pedido, id_cliente, metodo_pago) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Bloqueamos la fila para evitar pagos duplicados en paralelo
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
      throw new ForbiddenError('No tienes permiso para pagar este pedido.');
    }

    if (pedido.estado !== 'pendiente_pago') {
      throw new BusinessError(
        `No se puede pagar un pedido en estado "${pedido.estado}".`
      );
    }

    // Generar referencia de pago simulada
    const referencia_pago = `PAY-${id_pedido}-${Date.now()}-${crypto.randomUUID()}`;

    // Actualizar el pedido: estado, metodo_pago y referencia_pago
    await client.query(
      `UPDATE pedidos
       SET estado = 'en_preparacion',
           metodo_pago = $1,
           referencia_pago = $2
       WHERE id_pedido = $3`,
      [metodo_pago, referencia_pago, id_pedido]
    );

    // Obtener el detalle del pedido para registrar la salida de inventario
    const detalleResult = await client.query(
      `SELECT id_producto, cantidad
       FROM detalle_pedidos
       WHERE id_pedido = $1`,
      [id_pedido]
    );

    for (const item of detalleResult.rows) {
      await client.query(
        `INSERT INTO inventario_movimientos (id_producto, tipo, cantidad, id_pedido, creado_en)
         VALUES ($1, 'salida', $2, $3, NOW())`,
        [item.id_producto, item.cantidad, id_pedido]
      );
    }

    await client.query('COMMIT');

    return {
      referencia_pago,
      estado: 'en_preparacion'
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { procesarPago };