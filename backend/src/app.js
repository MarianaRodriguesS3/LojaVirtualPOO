const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Rotas
app.use('/api/products', productRoutes);
app.use('/api/usuario', usuarioRoutes);

module.exports = app;