// admin.routes.js: Rutas protegidas del panel de administracion

const express = require('express');
const router = express.Router();

const reportService = require('../services/report.service');
const orderService = require('../services/order.service');
const productService = require('../services/product.service');

const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

/* ============================================================
   REPORTES
============================================================ */

router.get(
    '/reports/sales',
    authMiddleware,
    roleMiddleware('administrador'),
    async (req, res) => {

        try {

            const { fecha_inicio, fecha_fin } = req.query;

            if (!fecha_inicio || !fecha_fin) {

                return res.status(400).json({
                    error: true,
                    mensaje: 'Debe enviar fecha_inicio y fecha_fin.',
                    codigo: 400
                });

            }

            const reporte = await reportService.obtenerReporteVentas(
                fecha_inicio,
                fecha_fin
            );

            return res.status(200).json(reporte);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: true,
                mensaje: 'Error al generar el reporte.',
                codigo: 500
            });

        }

    }
);

/* ============================================================
   PEDIDOS
============================================================ */

router.get(
    '/orders',
    authMiddleware,
    roleMiddleware('administrador'),
    async (req, res) => {

        try {

            const { estado } = req.query;

            const pedidos = await orderService.obtenerTodosLosPedidos(
                estado
            );

            return res.status(200).json({
                pedidos
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                error: true,
                mensaje: 'Error al consultar los pedidos.',
                codigo: 500
            });

        }

    }
);

router.patch(
    '/orders/:id/status',
    authMiddleware,
    roleMiddleware('administrador'),
    async (req, res) => {

        try {

            const idPedido = req.params.id;
            const { estado } = req.body;

            const pedido = await orderService.cambiarEstadoPedido(
                idPedido,
                estado
            );

            return res.status(200).json({

                mensaje: 'Estado del pedido actualizado.',

                pedido

            });

        } catch (error) {

            console.error(error);

            return res.status(400).json({

                error: true,

                mensaje: error.message,

                codigo: 400

            });

        }

    }
);

/* ============================================================
   PRODUCTOS
============================================================ */

router.get(
    '/products',
    authMiddleware,
    roleMiddleware('administrador'),
    async (req, res) => {

        try {

            const productos =
                await productService.obtenerTodosLosProductos();

            return res.status(200).json({
                productos
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                error: true,

                mensaje: 'Error al obtener los productos.',

                codigo: 500

            });

        }

    }
);

router.post(
    '/products',
    authMiddleware,
    roleMiddleware('administrador'),
    async (req, res) => {

        try {

            const producto =
                await productService.crearProducto(req.body);

            return res.status(201).json({

                mensaje: 'Producto creado correctamente.',

                producto

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                error: true,

                mensaje: 'No fue posible crear el producto.',

                codigo: 500

            });

        }

    }
);

router.put(
    '/products/:id',
    authMiddleware,
    roleMiddleware('administrador'),
    async (req, res) => {

        try {

            const producto =
                await productService.actualizarProducto(
                    req.params.id,
                    req.body
                );

            return res.status(200).json({

                mensaje: 'Producto actualizado.',

                producto

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                error: true,

                mensaje: 'No fue posible actualizar el producto.',

                codigo: 500

            });

        }

    }
);

router.delete(
    '/products/:id',
    authMiddleware,
    roleMiddleware('administrador'),
    async (req, res) => {

        try {

            await productService.desactivarProducto(
                req.params.id
            );

            return res.status(200).json({

                mensaje: 'Producto desactivado correctamente.'

            });

        } catch (error) {

            console.error(error);

            return res.status(400).json({

                error: true,

                mensaje: error.message,

                codigo: 400

            });

        }

    }
);

module.exports = router;