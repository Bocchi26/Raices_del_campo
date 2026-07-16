// product.repository.js: Consultas SQL sobre la tabla productos
// product.repository.js

const pool = require('../config/database');

class ProductRepository {

    async findAll() {

        const query = `
            SELECT
                p.id_producto,
                p.nombre,
                p.descripcion,
                p.precio_compra,
                p.precio_venta,
                p.stock,
                p.unidad_medida,
                p.origen,
                p.imagen_url,
                p.activo,
                c.id_categoria,
                c.nombre AS categoria
            FROM productos p
            INNER JOIN categorias c
                ON p.id_categoria = c.id_categoria
            ORDER BY p.nombre;
        `;

        const { rows } = await pool.query(query);

        return rows;

    }

    async create(producto) {

        const query = `
            INSERT INTO productos (
                nombre,
                descripcion,
                id_categoria,
                unidad_medida,
                origen,
                precio_compra,
                precio_venta,
                stock,
                imagen_url,
                activo
            )
            VALUES (
                $1,$2,$3,$4,$5,$6,$7,$8,$9,TRUE
            )
            RETURNING *;
        `;

        const values = [
            producto.nombre,
            producto.descripcion,
            producto.id_categoria,
            producto.unidad_medida,
            producto.origen,
            producto.precio_compra,
            producto.precio_venta,
            producto.stock,
            producto.imagen_url
        ];

        const { rows } = await pool.query(query, values);

        return rows[0];

    }

    async update(idProducto, producto) {

        const query = `
            UPDATE productos
            SET
                nombre = $1,
                descripcion = $2,
                id_categoria = $3,
                unidad_medida = $4,
                origen = $5,
                precio_compra = $6,
                precio_venta = $7,
                stock = $8,
                imagen_url = $9
            WHERE id_producto = $10
            RETURNING *;
        `;

        const values = [
            producto.nombre,
            producto.descripcion,
            producto.id_categoria,
            producto.unidad_medida,
            producto.origen,
            producto.precio_compra,
            producto.precio_venta,
            producto.stock,
            producto.imagen_url,
            idProducto
        ];

        const { rows } = await pool.query(query, values);

        return rows[0];

    }

    async tienePedidosActivos(idProducto) {

        const query = `
            SELECT COUNT(*) AS total
            FROM detalle_pedidos dp
            INNER JOIN pedidos p
                ON dp.id_pedido = p.id_pedido
            WHERE dp.id_producto = $1
              AND p.estado NOT IN ('cancelado','entregado');
        `;

        const { rows } = await pool.query(query, [idProducto]);

        return Number(rows[0].total);

    }

    async desactivar(idProducto) {

        const query = `
            UPDATE productos
            SET activo = FALSE
            WHERE id_producto = $1
            RETURNING *;
        `;

        const { rows } = await pool.query(query, [idProducto]);

        return rows[0];

    }

}

module.exports = new ProductRepository();