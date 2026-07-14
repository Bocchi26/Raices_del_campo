// order.service.js: Logica de creacion de pedidos, validacion de stock y cancelaciones
// order.service.js

const orderRepository = require('../repositories/order.repository');

class OrderService {

    async obtenerTodosLosPedidos(estado) {

        return await orderRepository.findAll(estado);

    }

    async cambiarEstadoPedido(idPedido, nuevoEstado) {

        const pedido = await orderRepository.findById(idPedido);

        if (!pedido) {
            throw new Error('Pedido no encontrado.');
        }

        const estadoActual = pedido.estado;

        const transicionesValidas = {
            en_preparacion: 'en_camino',
            en_camino: 'entregado'
        };

        if (transicionesValidas[estadoActual] !== nuevoEstado) {
            throw new Error(
                `No se puede cambiar el estado de "${estadoActual}" a "${nuevoEstado}".`
            );
        }

        const pedidoActualizado =
            await orderRepository.updateStatus(
                idPedido,
                nuevoEstado
            );

        if (nuevoEstado === 'entregado') {

            await orderRepository.registrarFechaEntrega(
                idPedido
            );

        }

        return pedidoActualizado;

    }

}

module.exports = new OrderService();