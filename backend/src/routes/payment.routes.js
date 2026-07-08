// payment.routes.js: POST /api/payments/:orderId (simulado)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const paymentService = require('../services/payment.service');

const METODOS_VALIDOS = ['PSE', 'tarjeta', 'nequi', 'daviplata'];

router.post('/api/payments/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { metodo_pago } = req.body;
    const id_cliente = req.user.id_cliente;

    if (!metodo_pago || !METODOS_VALIDOS.includes(metodo_pago)) {
      return res.status(400).json({
        error: `metodo_pago debe ser uno de: ${METODOS_VALIDOS.join(', ')}`
      });
    }

    const resultado = await paymentService.procesarPago(orderId, id_cliente, metodo_pago);

    return res.status(200).json(resultado);

  } catch (error) {
    console.error('Error al procesar el pago:', error);

    if (error.isBusinessError) {
      return res.status(400).json({ error: error.message });
    }

    if (error.isForbidden) {
      return res.status(403).json({ error: error.message });
    }

    if (error.isNotFound) {
      return res.status(404).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Error interno al procesar el pago.' });
  }
});

module.exports = router;