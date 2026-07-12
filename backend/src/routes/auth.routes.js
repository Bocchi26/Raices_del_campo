// auth.routes.js: POST /api/auth/register | POST /api/auth/login | POST /api/auth/logout
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/profile', authMiddleware, (req, res) => {

    res.status(200).json({
        mensaje: 'Acceso autorizado',
        usuario: req.user
    });

});


module.exports = router;