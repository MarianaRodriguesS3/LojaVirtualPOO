const db = require('../database/connection');

class Product {
  constructor(name, description, price, image) {
    this.name = name;
    this.description = description || null;
    this.price = price;
    this.image = image;
  }

  // Salvar novo produto no banco
  async save() {
    const sql = `
      INSERT INTO products (name, description, price, image)
      VALUES (?, ?, ?, ?)
    `;
    const values = [this.name, this.description, this.price, this.image];

    const [result] = await db.execute(sql, values);
    return result;
  }

  // Buscar todos os produtos
  static async findAll() {
    // Confere se a tabela existe
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  }
}

module.exports = Product;
