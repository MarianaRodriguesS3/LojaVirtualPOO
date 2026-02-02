# 🛒 Loja Virtual – Node.js + React + MySQL

Projeto de uma **loja virtual (e-commerce)** desenvolvido com **Node.js no backend**, **React no frontend** e **MySQL/MariaDB** como banco de dados, com foco em **Programação Orientada a Objetos (POO)** e arquitetura organizada em camadas.

---

## 🚀 Tecnologias Utilizadas

### 📦 Backend
- Node.js
- Express
- MySQL ou MariaDB
- phpMyAdmin
- JavaScript (ES6+)
- Programação Orientada a Objetos (POO)
- Arquitetura em camadas (MVC / Service / Repository)

### 🎨 Frontend
- React
- Vite
- JavaScript
- CSS

---

## 🗄 Banco de Dados

O projeto utiliza **MySQL (ou MariaDB)** como banco de dados relacional, com gerenciamento realizado via **phpMyAdmin**.

- Compatível com XAMPP, WAMP ou Laragon
- Integração com Node.js usando o driver `mysql2`
- Estrutura preparada para operações CRUD

---

## 🧱 Arquitetura do Backend (POO)

O backend segue princípios de **Programação Orientada a Objetos**, com separação clara de responsabilidades:

- **Models** → Entidades do domínio (ex: Product, User)
- **Repositories** → Acesso ao banco de dados
- **Services** → Regras de negócio
- **Controllers** → Comunicação HTTP (requisições e respostas)
- **Routes** → Definição das rotas da API

---

## 📁 Estrutura de Pastas

```bash
loja-virtual/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   └── Product.js
│   │   ├── repositories/
│   │   │   └── ProductRepository.js
│   │   ├── services/
│   │   │   └── ProductService.js
│   │   ├── controllers/
│   │   │   └── ProductController.js
│   │   └── routes/
│   │       └── product.routes.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductList.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
│
└── README.md

src/
├── components/
│   ├── Header.jsx
│   ├── Banner.jsx
│   ├── ProductCard.jsx
│   └── ProductList.jsx
├── pages/
│   └── Home.jsx
└── App.jsx
