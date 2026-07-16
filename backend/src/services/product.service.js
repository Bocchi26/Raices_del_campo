const productRepo = require('../repositories/product.repository');

const getProducts = async (categoriaId) => {
  return productRepo.findAll(categoriaId);
};

const getProductById = async (id) => {
  const producto = await productRepo.findById(id);
  if (!producto) {
    const error = new Error('Producto no encontrado');
    error.status = 404;
    throw error;
  }
  return producto;
};

module.exports = { getProducts, getProductById };