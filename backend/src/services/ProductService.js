const db = require('../database/connection');
const Product = require('../models/Product');

class ProductService {

  static async create(product) {
    const sql = `
      INSERT INTO products (name, description, price, image)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [
      product.name,
      product.description,
      product.price,
      product.image
    ];

    const result = await db.query(sql, values);
    return result.rows[0];
  }

  static async findAll() {
    const result = await db.query('SELECT * FROM products');

    return result.rows.map(
      r => new Product(r.name, r.description, r.price, r.image)
    );
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) return null;

    const r = result.rows[0];
    return new Product(r.name, r.description, r.price, r.image);
  }

  static async update(id, product) {
    const sql = `
      UPDATE products
      SET name = $1,
          description = $2,
          price = $3,
          image = $4
      WHERE id = $5
      RETURNING *;
    `;

    const values = [
      product.name,
      product.description,
      product.price,
      product.image,
      id
    ];

    const result = await db.query(sql, values);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );

    return result.rows[0];
  }
}

module.exports = ProductService;


/*
const db = require('../database/connection');
const Product = require('../models/Product');

class ProductService {
  static async create(product) {
    const sql = `INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`;
    const values = [product.name, product.description, product.price, product.image];
    const [result] = await db.execute(sql, values);
    return result;
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows.map(r => new Product(r.name, r.description, r.price, r.image));
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return new Product(r.name, r.description, r.price, r.image);
  }

  static async update(id, product) {
    const sql = `UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?`;
    const values = [product.name, product.description, product.price, product.image, id];
    const [result] = await db.execute(sql, values);
    return result;
  }

  static async delete(id) {
    const sql = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
    return result;
  }
}

module.exports = ProductService;
*/