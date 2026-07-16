// env.js: Carga y valida las variables de entorno requeridas
// env.js: Carga y valida las variables de entorno requeridas
require('dotenv').config();

const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missing = requiredVars.filter((key) => !process.env[key]);

if (missing.length > 0) {
throw new Error(`Faltan variables de entorno requeridas: ${missing.join(', ')}`);
}

const env = {
port: process.env.PORT || 3000,
db: {
host: process.env.DB_HOST,
port: process.env.DB_PORT,
database: process.env.DB_NAME,
user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}
};

module.exports = env;