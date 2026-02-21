const ProductService = require('../services/ProductService');
const Product = require('../models/Product');

class ProductController {
  async index(req, res) {
    try {
      const products = await ProductService.findAll();
      res.json(products.map(p => p.toJSON()));
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  }

  async create(req, res) {
    try {
      const { name, description, price, image } = req.body;

      if (!name || !price || !image) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando' });
      }

      const product = new Product(name, description, price, image);
      const result = await ProductService.create(product);

      res.status(201).json({ message: 'Produto cadastrado com sucesso!', id: result.insertId });
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, image } = req.body;

      const product = new Product(name, description, price, image);
      await ProductService.update(id, product);

      res.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ProductService.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
}

module.exports = new ProductController();