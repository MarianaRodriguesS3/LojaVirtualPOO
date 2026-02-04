const Product = require('../models/Product');

class ProductController {
  // Listar todos os produtos
  async index(req, res) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  }

  // Cadastrar um novo produto
  async create(req, res) {
    try {
      const { name, description, price, image } = req.body;

      if (!name || !price || !image) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
      }

      const product = new Product(name, description, price, image);
      const result = await product.save();

      res.status(201).json({ message: 'Produto cadastrado com sucesso!', id: result.insertId });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
  }
}

module.exports = new ProductController();
