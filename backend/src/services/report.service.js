// report.service.js: Consultas consolidadas de ventas para el dashboard
// report.service.js

const reportRepository = require('../repositories/report.repository');

class ReportService {

    async obtenerReporteVentas(fechaInicio, fechaFin) {

        const resumen = await reportRepository.getVentasPorPeriodo(
            fechaInicio,
            fechaFin
        );

        const productos = await reportRepository.getProductosMasVendidos(
            fechaInicio,
            fechaFin
        );

        const estados = await reportRepository.getPedidosPorEstado();

        return {
            reporte: {
                resumen: {
                    total_pedidos: Number(resumen.total_pedidos),
                    ingresos_totales: Number(resumen.ingresos_totales)
                },
                productos_mas_vendidos: productos,
                pedidos_por_estado: estados
            }
        };

    }

}

module.exports = new ReportService();