// app.js: Configuracion de Express, middlewares globales y montaje de rutas
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// El middleware de errores va SIEMPRE al final, despues de las rutas
app.use(errorMiddleware);

module.exports = app;