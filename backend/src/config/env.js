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

requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`La variable ${variable} no está definida.`);
    }
});

module.exports = process.env;