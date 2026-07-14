// report.repository.js: Consultas sobre vistas SQL para reportes
// report.repository.js

const pool = require('../config/database');

class ReportRepository {

    async getVentasPorPeriodo(fechaInicio, fechaFin) {

        const query = `
            SELECT
                COALESCE(SUM(total_pedidos),0) AS total_pedidos,
                COALESCE(SUM(ingresos),0) AS ingresos_totales
            FROM vista_ventas_por_periodo
            WHERE fecha BETWEEN $1 AND $2
        `;

        const { rows } = await pool.query(query, [
            fechaInicio,
            fechaFin
        ]);

        return rows[0];

    }

    async getProductosMasVendidos(fechaInicio, fechaFin) {

        const query = `
            SELECT
                nombre,
                total_vendido,
                ingreso_generado
            FROM vista_productos_mas_vendidos
            LIMIT 5
        `;

        const { rows } = await pool.query(query);

        return rows;

    }

    async getPedidosPorEstado() {

        const query = `
            SELECT
                estado,
                total
            FROM vista_pedidos_por_estado
        `;

        const { rows } = await pool.query(query);

        return rows;

    }

}

module.exports = new ReportRepository();