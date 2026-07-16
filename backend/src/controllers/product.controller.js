// product.controller.js: Controlador de endpoints del catalogo de productos
const productService = require('../services/product.service');

const getProducts = async (req, res, next) => {
  try {
    const { categoria } = req.query;
    const productos = await productService.getProducts(categoria);
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const producto = await productService.getProductById(req.params.id);
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById };