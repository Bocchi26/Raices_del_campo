// app.js: Configuracion de Express, middlewares globales y montaje de rutas
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const authRoutes = require('./routes/auth.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Ruta temporal para comprobar que funciona
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Backend de Raíces del Campo funcionando correctamente'
    });
});

// El middleware de errores va SIEMPRE al final, despues de las rutas
app.use(errorMiddleware);

module.exports = app;