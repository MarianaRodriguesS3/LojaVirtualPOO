const express = require('express');
const cors = require('cors');
const path = require('path');

// Rotas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // 👈 NOVO

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 servir imagens estáticas
app.use(
  '/images',
  express.static(path.join(__dirname, '../public/images'))
);

// ==========================
// ROTAS DA API
// ==========================

// Produtos (pública)
app.use('/api/products', productRoutes);

// Autenticação (login / cadastro)
app.use('/api/auth', authRoutes); // 👈 NOVO

module.exports = app;