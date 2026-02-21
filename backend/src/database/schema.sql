-- Cria o banco de dados, se ainda não existir
CREATE DATABASE IF NOT EXISTS lojavirtual CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco para usar
USE lojavirtual;

-- Cria a tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- cadastro dos produtos

USE lojavirtual;

INSERT INTO products (name, description, price, image) VALUES
('Tênis Feminino Branco', 'Tênis feminino confortável branco.', 82.90, 'tenis1.jpeg'),
('Tênis All Star', 'Tênis All Star Azul.', 129.90, 'tenis2.jpeg'),
('Tênis Nike', 'Tênis Nike Air Force.', 109.90, 'tenis3.jpeg'),
('Tênis Vans', 'Sapatenis Deals Tênis Vans Unisex.', 89.90, 'tenis4.jpeg'),
('Tênis Feminino Rose', 'Tênis Feminino Branco Rose Sara.', 109.90, 'tenis5.jpeg'),
('Tênis Adidas', 'Tênis Adidas Feminino Grand Court.', 259.90, 'tenis6.jpeg'),
('Tênis Branco Casual', 'Tênis Feminino Branco Casual.', 79.90, 'tenis7.jpeg'),
('Tênis Shoes', 'Tênis Feminino Casual Original Shoes.', 99.90, 'tenis8.jpeg');


-- cadastro de usuários 

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);