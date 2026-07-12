// auth.routes.js: POST /api/auth/register | POST /api/auth/login | POST /api/auth/logout
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');



router.post('/register', authController.register);

router.post('/login', authController.login);



module.exports = router;