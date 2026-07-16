// product.service.js: Logica de catalogo, stock y gestion de productos
// product.service.js

const productRepository = require('../repositories/product.repository');

class ProductService {

    async obtenerTodosLosProductos() {

        return await productRepository.findAll();

    }

    async crearProducto(data) {

        return await productRepository.create(data);

    }

    async actualizarProducto(idProducto, data) {

        return await productRepository.update(
            idProducto,
            data
        );

    }

    async desactivarProducto(idProducto) {

        const pedidosActivos =
            await productRepository.tienePedidosActivos(
                idProducto
            );

        if (pedidosActivos > 0) {

            throw new Error(
                'No se puede desactivar el producto porque tiene pedidos activos.'
            );

        }

        return await productRepository.desactivar(
            idProducto
        );

    }

}

module.exports = new ProductService();