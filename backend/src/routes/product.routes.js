const express = require('express');
const router = express.Router();
const productService = require('../services/product.service');

router.get('/', productService.getProducts);
router.get('/:id', productService.getProductById);

module.exports = router;