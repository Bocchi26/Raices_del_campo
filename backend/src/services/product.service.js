const productRepo = require('../repositories/product.repository');

const getProducts = async (req, res) => {
  try {
    const { categoria } = req.query;
    const productos = await productRepo.findAll(categoria);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const getProductById = async (req, res) => {
  try {
    const producto = await productRepo.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

module.exports = { getProducts, getProductById };