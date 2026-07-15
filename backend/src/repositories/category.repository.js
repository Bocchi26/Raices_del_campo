// category.repository.js: Consultas SQL sobre la tabla categorias
const pool = require("../database/connection");

async function findAll(){

    const result = await pool.query(
        `SELECT *
        FROM categories`
    );

    return result.rows;

}

module.exports={
    findAll
};