const express = require('express');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 servir imagens estáticas
app.use(
  '/images',
  express.static(path.join(__dirname, '../public/images'))
);

// rotas da API
app.use('/api/products', productRoutes);

module.exports = app;
