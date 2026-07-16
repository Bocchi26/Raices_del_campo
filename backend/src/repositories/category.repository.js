const db = require('../config/db');

const findAll = async () => {
  const query = 'SELECT id_categoria AS id, nombre, descripcion FROM categorias ORDER BY nombre ASC';
  const { rows } = await db.query(query);
  return rows;
};

module.exports = { findAll };