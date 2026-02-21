const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

// Produtos
router.get('/', (req, res) => ProductController.index(req, res));
router.post('/', (req, res) => ProductController.create(req, res));
router.put('/:id', (req, res) => ProductController.update(req, res));
router.delete('/:id', (req, res) => ProductController.delete(req, res));

module.exports = router;