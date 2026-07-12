// app.js: Configuracion de Express, middlewares globales y montaje de rutas
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/auth', authRoutes);

// Ruta temporal para comprobar que funciona
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Backend de Raíces del Campo funcionando correctamente'
    });
});

module.exports = app;