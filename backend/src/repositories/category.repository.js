const db = require('../config/db'); // Asumiendo conexión pg

const findAll = async () => {
const query = 'SELECT * FROM categorias';
const { rows } = await db.query(query);
return rows;
};

module.exports = { findAll };