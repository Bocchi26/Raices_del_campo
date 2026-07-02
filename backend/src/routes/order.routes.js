// order.routes.js: POST /api/orders | GET /api/orders/my | GET /api/orders/:id
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const orderService = require('../services/order.service');

router.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const { items, fecha_entrega, franja_horaria } = req.body;
    const id_usuario = req.user.id; // asumiendo que auth.middleware setea req.user

    // Validaciones básicas de entrada
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'El pedido debe incluir al menos un item.' });
    }

    for (const item of items) {
      if (!item.id_producto || !item.cantidad || item.cantidad <= 0) {
        return res.status(400).json({
          error: 'Cada item debe incluir id_producto y una cantidad mayor a 0.'
        });
      }
    }

    if (!fecha_entrega || !franja_horaria) {
      return res.status(400).json({ error: 'fecha_entrega y franja_horaria son obligatorios.' });
    }

    const id_pedido = await orderService.crearPedido({
      id_usuario,
      items,
      fecha_entrega,
      franja_horaria
    });

    return res.status(201).json({ id_pedido });

  } catch (error) {
    console.error('Error al crear el pedido:', error);

    // Errores de negocio (ej. stock insuficiente) los mandamos como 400
    if (error.isBusinessError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Error interno al procesar el pedido.' });
  }
});

module.exports = router;
// GET /api/orders/my - pedidos del usuario autenticado
router.get('/api/orders/my', authMiddleware, async (req, res) => {
  try {
    const id_cliente = req.user.id_cliente;
    const pedidos = await orderService.obtenerPedidosPorUsuario(id_cliente);
    return res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener los pedidos del usuario:', error);
    return res.status(500).json({ error: 'Error interno al obtener los pedidos.' });
  }
});

// GET /api/orders/:id - detalle completo de un pedido
router.get('/api/orders/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const id_cliente = req.user.id_cliente;

    const pedido = await orderService.obtenerDetallePedido(id, id_cliente);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    return res.status(200).json(pedido);

  } catch (error) {
    console.error('Error al obtener el detalle del pedido:', error);

    if (error.isForbidden) {
      return res.status(403).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Error interno al obtener el pedido.' });
  }
});

// PATCH /api/orders/:id/cancel - cancelar un pedido
router.patch('/api/orders/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const id_cliente = req.user.id_cliente;

    await orderService.cancelarPedido(id, id_cliente);

    return res.status(200).json({ mensaje: 'Pedido cancelado correctamente.' });

  } catch (error) {
    console.error('Error al cancelar el pedido:', error);

    if (error.isBusinessError) {
      return res.status(400).json({ error: error.message });
    }

    if (error.isForbidden) {
      return res.status(403).json({ error: error.message });
    }

    if (error.isNotFound) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Error interno al cancelar el pedido.' });
  }
});