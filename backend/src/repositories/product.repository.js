const db = require('../config/db');

const findAll = async (categoriaId) => {
  let query = 'SELECT * FROM productos WHERE activo = true AND stock > 0';
  const params = [];
  
  if (categoriaId) {
    query += ' AND categoria_id = $1';
    params.push(categoriaId);
  }
  
  const { rows } = await db.query(query, params);
  return rows;
};

const findById = async (id) => {
  const { rows } = await db.query('SELECT * FROM productos WHERE id = $1', [id]);
  return rows[0];
};

const updateStock = async (id, cantidad, client) => {
  // El client es pasado para mantener la atomicidad en transacciones
  const query = 'UPDATE productos SET stock = stock - $1 WHERE id = $2';
  return await client.query(query, [cantidad, id]);
};

module.exports = { findAll, findById, updateStock };