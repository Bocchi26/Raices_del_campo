// user.repository.js: Consultas SQL sobre las tablas usuarios y clientes
const pool = require('../config/db');


const userRepository = {                                                //Creación del objeto y dentro del objeto van todos los métodos relacionados con los usuarios 
    
///////////////////////
    
async findByEmail(email) {     //Async porque las consultas a PostgreSQL toman tiempo, entonces se pueden ejecutar otras en segudo plano

    //Por explicar...
    const tables = await pool.query(`
        SELECT table_name
        FROM information_schema.tables       
        WHERE table_schema = 'public'
    `);


    const result = await pool.query(
        `SELECT * FROM clientes WHERE email = $1`,
        [email]
    );

    return result.rows[0];
},

///////////////////////

    async createUser(userData) {

        const {
            nombre,
            apellido,
            email,
            password_hash,             //Desestructuración para obtener los valores del objeto
            telefono,       
            direccion,
            ciudad
        } = userData;

        const result = await pool.query(                   //Returning para pedir que devuelva el usuario recién creado y no hacer un segundo select
            `
            INSERT INTO clientes
            (
                nombre,
                apellido,
                email,
                password_hash,
                telefono,
                direccion,
                ciudad
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING                               
                id_cliente,
                nombre,
                apellido,
                email,
                rol
            `,
            [
                nombre,
                apellido,
                email,
                password_hash,
                telefono,
                direccion,
                ciudad
            ]
        );

        return result.rows[0]; 


    },
///////////////////////


    async deactivate(id_cliente) {

    }
};

module.exports = userRepository;