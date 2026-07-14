// order.repository.js: Consultas SQL sobre las tablas pedidos y detalle_pedidos
// order.repository.js

const pool = require('../config/database');

class OrderRepository {

    async findAll(estado) {

        let query = `
            SELECT
                p.id_pedido,
                p.fecha_pedido,
                p.fecha_entrega,
                p.estado,
                p.total,
                c.id_cliente,
                c.nombre,
                c.apellido,
                c.email
            FROM pedidos p
            INNER JOIN clientes c
                ON p.id_cliente = c.id_cliente
        `;

        const values = [];

        if (estado) {
            query += ` WHERE p.estado = $1`;
            values.push(estado);
        }

        query += ` ORDER BY p.fecha_pedido DESC`;

        const { rows } = await pool.query(query, values);

        return rows;
    }

    async findById(idPedido) {

        const query = `
            SELECT *
            FROM pedidos
            WHERE id_pedido = $1
        `;

        const { rows } = await pool.query(query, [idPedido]);

        return rows[0];
    }

    async updateStatus(idPedido, estado) {

        const query = `
            UPDATE pedidos
            SET estado = $1
            WHERE id_pedido = $2
            RETURNING *
        `;

        const { rows } = await pool.query(query, [
            estado,
            idPedido
        ]);

        return rows[0];
    }

    async registrarFechaEntrega(idPedido) {

        const query = `
            UPDATE entregas
            SET fecha_entrega_real = NOW(),
                estado_entrega = 'entregada'
            WHERE id_pedido = $1
        `;

        await pool.query(query, [idPedido]);

    }

}

module.exports = new OrderRepository();