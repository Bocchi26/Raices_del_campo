// env.js: Carga y valida las variables de entorno requeridas
require('dotenv').config();

const requiredVariables = [
    'PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'JWT_SECRET'
];

const missing = requiredVariables.filter((key) => !process.env[key]);

if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno requeridas: ${missing.join(', ')}`);
}

const env = {
    ...process.env, // acceso plano: env.PORT, env.DB_HOST, env.JWT_SECRET, etc.

    // acceso estructurado (compatibilidad con código que use env.port / env.db.host)
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    jwtSecret: process.env.JWT_SECRET,
};

module.exports = env;
