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

## Novas Funcionalidades

- Ampliar as opções de tamanho dos produtos para maior do que a quantidade exibida no view do card. Sugestão: efeito carrocel
- Favicon personalizado
- Criar logo e nome da loja
- Criar um footer

### Checkout completo

Rascunho:
- dados sensiveis
    - endereços
    - informações pessoais
- forma de resolver: 
    - no cadastro do usuário, voce irá preencher automaticamente a informação endereco e a informação dados pessoais
        - endereco: "endereço famoso"
        - dados-pessoas: 
            - nome de um famoso:
            - cpf inventado: sugestão: gerador de cpf
- comportamento de compra para produto em checkout unitário
- de forma simplificado, criar um checkout
- conclusao de completo: carrinho, informaçoes do usuario e opção de compra

### Investigar

- armazenamento de imagem
- armazenamento de informação de produtos