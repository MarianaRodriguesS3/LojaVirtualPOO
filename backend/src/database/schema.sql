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
('Tênis Masculino Preto', 'Tênis masculino casual preto.', 95.50, 'tenis2.jpeg'),
('Tênis Unissex Azul', 'Tênis unissex esportivo azul.', 110.00, 'tenis3.jpeg'),
('Tênis Infantil Vermelho', 'Tênis infantil resistente vermelho.', 60.00, 'tenis4.jpeg'),
('Tênis Corrida Cinza', 'Tênis para corrida, leve e confortável.', 130.00, 'tenis5.jpeg'),
('Tênis Casual Marrom', 'Tênis casual marrom para uso diário.', 78.90, 'tenis6.jpeg'),
('Tênis Esportivo Verde', 'Tênis esportivo com solado reforçado.', 120.00, 'tenis7.jpeg'),
('Tênis Fashion Rosa', 'Tênis fashion feminino rosa, muito estiloso.', 99.90, 'tenis8.jpeg');
