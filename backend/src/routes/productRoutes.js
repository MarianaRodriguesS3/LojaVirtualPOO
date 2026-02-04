const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

// Listar produtos
router.get('/', (req, res) => ProductController.index(req, res));

// Cadastrar produto
router.post('/', (req, res) => ProductController.create(req, res));

module.exports = router;
