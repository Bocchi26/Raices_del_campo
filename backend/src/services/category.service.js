const categoryRepo = require('../repositories/category.repository');

const getCategories = async () => {
  return categoryRepo.findAll();
};

module.exports = { getCategories };