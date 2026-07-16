// db.js: Configuracion del pool de conexiones a PostgreSQL con pg
// db.js: Configuracion del pool de conexiones a PostgreSQL con pg
const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.database,
  user: env.db.user,
  password: env.db.password,
});

module.exports = pool;