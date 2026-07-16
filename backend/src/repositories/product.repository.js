const db = require('../config/db');

const findAll = async (categoriaId) => {
  let query = `
    SELECT id_producto AS id, nombre, descripcion, precio, stock, id_categoria AS categoria_id, imagen_url
    FROM productos
    WHERE activo = true AND stock > 0
  `;
  const params = [];
  if (categoriaId) {
    params.push(categoriaId);
    query += ` AND id_categoria = $${params.length}`;
  }
  const { rows } = await db.query(query, params);
  return rows;
};

const findById = async (id) => {
  const query = `
    SELECT id_producto AS id, nombre, descripcion, precio, stock, id_categoria AS categoria_id, imagen_url
    FROM productos
    WHERE id_producto = $1
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const updateStock = async (id, cantidad, client) => {
  const executor = client || db;
  const query = `
    UPDATE productos
    SET stock = stock - $1
    WHERE id_producto = $2 AND stock >= $1
    RETURNING id_producto AS id, stock
  `;
  const { rows } = await executor.query(query, [cantidad, id]);
  return rows[0] || null; // null = no habia stock suficiente
};

module.exports = { findAll, findById, updateStock };