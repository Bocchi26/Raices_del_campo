// inventory.repository.js: Consultas SQL sobre la tabla inventario_movimientos
const pool = require('../config/db');

// Registra un movimiento de inventario
async function registrarMovimiento(data, client) {
  const db = client || pool;

  const { id_producto, tipo_movimiento, cantidad, motivo, id_pedido } = data;

  const result = await db.query(
    `INSERT INTO inventario_movimientos (id_producto, tipo_movimiento, cantidad, motivo, id_pedido, creado_en)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING id_movimiento`,
    [id_producto, tipo_movimiento, cantidad, motivo, id_pedido]
  );

  return result.rows[0].id_movimiento;
}

module.exports = { registrarMovimiento };