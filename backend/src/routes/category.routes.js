const express = require('express');
const router = express.Router();
const categoryService = require('../services/category.service');

router.get('/', categoryService.getCategories);

module.exports = router;