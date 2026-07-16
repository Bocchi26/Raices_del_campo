// order.repository.js
const pool = require('../config/database'); // ⚠️ Ver nota abajo sobre esta ruta

// Inserta un pedido y retorna el id generado
async function createOrder(orderData, client) {
  const db = client || pool;

  const { id_cliente, fecha_entrega, franja_horaria, total, estado } = orderData;

  const result = await db.query(
    `INSERT INTO pedidos (id_cliente, fecha_entrega, franja_horaria, total, estado, creado_en)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING id_pedido`,
    [id_cliente, fecha_entrega, franja_horaria, total, estado]
  );

  return result.rows[0].id_pedido;
}

// Inserta una línea de detalle de pedido
async function createOrderDetail(detailData, client) {
  const db = client || pool;

  const { id_pedido, id_producto, cantidad, precio_unitario, subtotal } = detailData;

  const result = await db.query(
    `INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, precio_unitario, subtotal)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_detalle`,
    [id_pedido, id_producto, cantidad, precio_unitario, subtotal]
  );

  return result.rows[0].id_detalle;
}

// Retorna todos los pedidos (opcionalmente filtrados por estado), con datos del cliente
async function findAll(estado) {
  let query = `
    SELECT
      p.id_pedido,
      p.fecha_pedido,
      p.fecha_entrega,
      p.estado,
      p.total,
      c.id_cliente,
      c.nombre,
      c.apellido,
      c.email
    FROM pedidos p
    INNER JOIN clientes c
      ON p.id_cliente = c.id_cliente
  `;

  const values = [];

  if (estado) {
    query += ` WHERE p.estado = $1`;
    values.push(estado);
  }

  query += ` ORDER BY p.fecha_pedido DESC`;

  const { rows } = await pool.query(query, values);

  return rows;
}

// Retorna todos los pedidos de un cliente, ordenados por fecha descendente
async function findByClient(id_cliente) {
  const result = await pool.query(
    `SELECT id_pedido, fecha_entrega, franja_horaria, total, estado, metodo_pago, referencia_pago, creado_en
     FROM pedidos
     WHERE id_cliente = $1
     ORDER BY creado_en DESC`,
    [id_cliente]
  );

  return result.rows;
}

// Retorna un pedido con su detalle de productos (JOIN con productos)
async function findById(id_pedido) {
  const pedidoResult = await pool.query(
    `SELECT id_pedido, id_cliente, fecha_entrega, franja_horaria, total, estado, metodo_pago, referencia_pago, creado_en
     FROM pedidos
     WHERE id_pedido = $1`,
    [id_pedido]
  );

  const pedido = pedidoResult.rows[0];

  if (!pedido) {
    return null;
  }

  const detalleResult = await pool.query(
    `SELECT dp.id_detalle, dp.id_producto, p.nombre, dp.cantidad, dp.precio_unitario, dp.subtotal
     FROM detalle_pedidos dp
     JOIN productos p ON p.id_producto = dp.id_producto
     WHERE dp.id_pedido = $1`,
    [id_pedido]
  );

  pedido.items = detalleResult.rows;

  return pedido;
}

// Actualiza el estado de un pedido
async function updateStatus(id_pedido, estado, client) {
  const db = client || pool;

  const { rows } = await db.query(
    `UPDATE pedidos SET estado = $1 WHERE id_pedido = $2 RETURNING *`,
    [estado, id_pedido]
  );

  return rows[0];
}

// Registra la fecha real de entrega de un pedido
async function registrarFechaEntrega(id_pedido) {
  await pool.query(
    `UPDATE entregas
     SET fecha_entrega_real = NOW(),
         estado_entrega = 'entregada'
     WHERE id_pedido = $1`,
    [id_pedido]
  );
}

module.exports = {
  createOrder,
  createOrderDetail,
  findAll,
  findByClient,
  findById,
  updateStatus,
  registrarFechaEntrega
};
