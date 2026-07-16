// db.js: Configuracion del pool de conexiones a PostgreSQL con pg
const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
});

pool.connect()
    .then((client) => {
        console.log('✅ Conectado a PostgreSQL');
        client.release();
    })
    .catch((error) => {
        console.error('❌ Error al conectar con PostgreSQL');
        console.error(error.message);
    });

module.exports = pool;