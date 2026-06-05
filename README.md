# 🛒 Loja Virtual – Node.js + React + MySQL

Este projeto é uma aplicação completa de **e-commerce de calçados**, desenvolvida com **Node.js no backend**, **React no frontend** e **MySQL** como banco de dados relacional. A arquitetura foi projetada sob os princípios de **Programação Orientada a Objetos (POO)** e separação estrita em camadas, garantindo escalabilidade, manutenibilidade e segurança.

---

## 🚀 Tecnologias e Arquitetura

### 📦 Backend
Camada responsável pelo processamento das regras de negócio, segurança, gerenciamento de sessões e persistência de dados.

- **Tecnologias:** Node.js, Express, MySQL (`mysql2`), JWT (`jsonwebtoken`), Criptografia (`bcryptjs`).
- **Arquitetura:** Orientada a Objetos (POO) dividida em Rotas, Controllers, Services e Models.
- **Funcionalidades:** API RESTful, autenticação via Bearer Token, queries parametrizadas antinjeção, mascaramento de dados sensíveis e manipulação dinâmica de cadastros e checkouts.

### 🎨 Frontend
Interface SPA (Single Page Application) responsiva, focada na experiência do usuário, consumo assíncrono de dados e gerenciamento de estado global.

- **Tecnologias:** React, Vite, React Router DOM, Context API, Axios.
- **Funcionalidades:** Estado global do carrinho, validações locais de formulários, máscaras de inputs (CPF/CEP), integração com API externa (ViaCEP) e simulação de rastreamento logístico em tempo real.

### 🗄️ Banco de Dados
O banco de dados é responsável por armazenar e organizar as informações do sistema, sendo acessado pelo backend para persistência dos dados.

- **Tecnologias:** MySQL com pacote `mysql2` (Aplicações auxiliares: XAMPP e phpMyAdmin).
- **Funcionalidades:** Armazenamento de usuários, produtos e endereços através de uma estrutura relacional com suporte completo a operações CRUD, garantindo a integridade e segurança dos dados.
- **Banco:** `lojavirtual`
- **Tabelas Principais:** `users`, `products`, `enderecos` e `cartoes` (dados financeiros criptografados).

---

## 🗺️ Estrutura da Documentação

Clique nos tópicos abaixo para visualizar os detalhes de cada módulo do sistema:

### [🎨 Frontend - Componentes e Páginas](./README-GUIDE.md#secao-frontend)
* [🏠 Página Home](./README-GUIDE.md#home)
* [🧭 Componente Header](./README-GUIDE.md#header)
* [🛒 Página Carrinho (Cart)](./README-GUIDE.md#cart)
* [🔐 Página Login](./README-GUIDE.md#login)
* [🎯 Componente Banner](./README-GUIDE.md#banner)
* [📦 Componente ProductList](./README-GUIDE.md#productlist)
* [🛍️ Componente ProductCard](./README-GUIDE.md#productcard)
* [🛒 Contexto CartContext](./README-GUIDE.md#cartcontext)
* [🔔 Componente CartMessage](./README-GUIDE.md#cartmessage)
* [💳 Página Checkout](./README-GUIDE.md#checkout)
* [🧾 Página FinalizarCompra](./README-GUIDE.md#finalizarcompra)
* [🔘 Componente BtnFinalizarCompra](./README-GUIDE.md#btnfinalizarcompra)
* [📦 Página StatusPedido](./README-GUIDE.md#statuspedido)
* [💰 Componente AbaPix](./README-GUIDE.md#abapix)
* [💳 Componente AbaCartao](./README-GUIDE.md#abacartao)
* [🎴 Componente AnimacaoCartao](./README-GUIDE.md#animacaocartao)
* [📝 Página de Cadastro](./README-GUIDE.md#cadastro)
* [✏️ Página EditarCadastro](./README-GUIDE.md#editarcadastro)
* [🔑 Página ForgotPassword](./README-GUIDE.md#forgotpassword)
* [🔐 Página ResetPassword](./README-GUIDE.md#resetpassword)
* [🎴 Componente Footer](./README-GUIDE.md#footer)

### [📦 Backend - Camadas da API](./README-GUIDE.md#secao-backend)
* [📦 Model Product](./README-GUIDE.md#model-product)
* [📦 Model Usuario](./README-GUIDE.md#model-usuario)
* [🎮 Controller ProductController](./README-GUIDE.md#controller-productcontroller)
* [🎮 Controller UsuarioController](./README-GUIDE.md#controller-usuariocontroller)
* [🛠️ Service ProductService](./README-GUIDE.md#service-productservice)
* [🛠️ Service UsuarioService](./README-GUIDE.md#service-usuarioservice)
* [🛣️ Rotas de Produtos](./README-GUIDE.md#rotas-produtos)
* [🛣️ Rotas de Usuários](./README-GUIDE.md#rotas-usuarios)
* [🛡️ Middleware authMiddleware](./README-GUIDE.md#middleware-auth)
* [🗄️ Conexão com o Banco de Dados (Pool)](./README-GUIDE.md#pool-banco)
* [🌐 Configuração do Aplicativo (App)](./README-GUIDE.md#config-app)
* [🚀 Inicialização do Servidor (Server)](./README-GUIDE.md#init-server)
