const path = require('path');
const db = require(path.resolve(__dirname, '../src/database/connection'));

(async () => {
  try {

    // 🧱 1. CRIAR TABELAS
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        reset_token VARCHAR(255),
        reset_token_expire TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS enderecos (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        cep VARCHAR(10),
        rua VARCHAR(255),
        numero VARCHAR(20),
        bairro VARCHAR(100),
        cidade VARCHAR(100),
        estado VARCHAR(2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS cartoes (
        id SERIAL PRIMARY KEY,
        usuario_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        numero VARCHAR(16),
        mes VARCHAR(2),
        ano VARCHAR(4),
        cvv VARCHAR(3)
      );
    `);

    // 🧹 2. LIMPAR PRODUTOS
    await db.query(`DELETE FROM products;`);

    // 📦 3. INSERIR PRODUTOS
    await db.query(`
  INSERT INTO products (name, description, price, image)
  VALUES
    ('Tênis Feminino Branco', 'Confortável e moderno', 82.90, 'https://runshoes-backend.onrender.com/images/tenis1.jpeg'),
    ('Tênis All Star', 'Clássico e versátil', 129.90, 'https://runshoes-backend.onrender.com/images/tenis2.jpeg'),
    ('Tênis Nike Air Force', 'Estilo urbano', 109.90, 'https://runshoes-backend.onrender.com/images/tenis3.jpeg'),
    ('Tênis Vans', 'Casual unissex', 89.90, 'https://runshoes-backend.onrender.com/images/tenis4.jpeg'),
    ('Tênis Feminino Rosé', 'Elegante e confortável', 109.90, 'https://runshoes-backend.onrender.com/images/tenis5.jpeg'),
    ('Tênis Adidas', 'Conforto esportivo', 259.90, 'https://runshoes-backend.onrender.com/images/tenis6.jpeg'),
    ('Tênis Branco Casual', 'Uso diário confortável', 79.90, 'https://runshoes-backend.onrender.com/images/tenis7.jpeg'),
    ('Tênis Shoes', 'Modelo casual moderno', 99.90, 'https://runshoes-backend.onrender.com/images/tenis8.jpeg');
`);
    // ✅ FINALIZAÇÃO

    console.log("✅ Seed executado com sucesso!");
    process.exit();

  } catch (err) {
    console.error("❌ Erro no seed:", err);
    process.exit(1);
  }
})();