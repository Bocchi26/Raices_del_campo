// category.controller.js: Controlador de endpoints de categorias
const categoryService = require('../services/category.service');

const getCategories = async (req, res, next) => {
  try {
    const categorias = await categoryService.getCategories();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories };