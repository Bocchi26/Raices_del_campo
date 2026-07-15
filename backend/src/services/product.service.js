// product.service.js: Logica de catalogo, stock y gestion de productos
const productRepository = require("../repositories/product.repository");

async function getProducts(categoriaId){

    return await productRepository.findAll(categoriaId);

}

async function getProductById(id){

    const product = await productRepository.findById(id);

    if(!product){

        throw new Error("Producto no encontrado");

    }

    return product;

}

module.exports={
    getProducts,
    getProductById
};