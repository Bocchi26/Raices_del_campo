// product.repository.js: Consultas SQL sobre la tabla productos
const pool = require("../database/connection");

async function findAll(categoriaId){

    let query = `
        SELECT *
        FROM products
        WHERE activo = true
        AND stock > 0
    `;

    let params=[];


    if(categoriaId){

        query += " AND categoria_id=$1";

        params.push(categoriaId);

    }


    const result = await pool.query(query,params);


    return result.rows;

}

async function findById(id){

    const result = await pool.query(
        `
        SELECT *
        FROM products
        WHERE id=$1
        `,
        [id]
    );

    return result.rows[0];

}

async function updateStock(id,cantidad,client){

    const db = client || pool;

    const result = await db.query(
        `
        UPDATE products
        SET stock = stock - $2
        WHERE id=$1
        RETURNING *
        `,
        [id,cantidad]
    );

    return result.rows[0];

}

module.exports={
    findAll,
    findById,
    updateStock
};