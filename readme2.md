# Frontend

## 🏠 Página Home

## 🧭 Componente Header

## 🛒 Página Carrinho (Cart)

## 🔐 Página Login

## 🎯 Componente Banner

## 📦 Componente ProductList

## 🛍️ Componente ProductCard

## 🛒 Contexto CartContext

## 🔔 Componente CartMessage

## 💳 Página Checkout

## 🧾 Página FinalizarCompra

## 🔘 Componente BtnFinalizarCompra

## 💰 Componente AbaPix

## 💳 Componente AbaCartao

## 🎴 Componente AnimacaoCartao

## 📝 Página de Cadastro

## Página: EditarCadastro

## Página: ForgotPassword

## Página: ResetPassword



## Novas Funcionalidades


- Favicon personalizado
- Criar logo e nome da loja
- Criar um footer

### nova pagina

- meus pedidos (pagina que acompanha a compra após ser finalizada)



# Sistema de E-commerce

## Considerações iniciais
Este sistema é uma aplicação de e-commerce que permite aos usuários navegar por produtos, adicioná-los ao carrinho, finalizar compras com diferentes formas de pagamento, e gerenciar suas contas e senhas. O sistema fornece feedback visual e interativo ao usuário, garantindo uma experiência intuitiva e segura.

---

## Frontend

O frontend é responsável pela interface do usuário, navegação entre páginas, interação com produtos e integração com o backend.  

**Tecnologias usadas:**
- React (componentes funcionais e hooks)
- React Router DOM (navegação entre páginas)
- CSS para estilização (componentes separados)
- Context API para gerenciamento de estado global (ex: carrinho)

**Funções principais:**
- Renderizar páginas e componentes de forma dinâmica
- Gerenciar formulários e validações
- Interagir com a API do backend para login, cadastro, atualização de dados e processamento de pedidos
- Fornecer feedback visual com mensagens, animações e notificações

---

## Backend

O backend gerencia a lógica de negócio, autenticação de usuários, manipulação de produtos e processamento de pedidos.  

**Tecnologias usadas:**
- Node.js e Express
- Rotas REST para cadastro, login, recuperação de senha, produtos e pedidos
- Integração com o banco de dados para CRUD de usuários e pedidos
- Validações de dados e segurança (ex: senhas, tokens de recuperação)

**Funções principais:**
- Registrar, autenticar e atualizar usuários
- Gerenciar produtos e pedidos
- Processar requisições de pagamento
- Validar dados sensíveis e enviar respostas para o frontend

---

## Banco de dados

**Funções:**
- Armazenar informações de usuários, produtos e endereços
- Garantir integridade e segurança dos dados

**Tecnologias usadas:**
- MySQL com pacote `mysql2`
- Aplicações auxiliares: XAMPP e phpMyAdmin

**Configuração:**
- Nome do banco de dados: `lojavirtual`
- Tabelas existentes:
  - `products` → produtos
  - `users` → usuários
  - `enderecos` → endereços

**Observações:**
- Consultas SQL utilizadas para CRUD e operações relacionadas a usuários, produtos e pedidos

---

# Frontend

## 🏠 Página Home
Página inicial que exibe produtos em destaque e banners promocionais. Fornece navegação para categorias, carrinho e login.

---

## 🧭 Componente Header
Barra superior fixa com:
- Logo
- Menu de navegação
- Ícone do carrinho (acesso rápido)
- Link de login/conta do usuário

---

## 🛒 Página Carrinho (Cart)
Exibe produtos adicionados pelo usuário, permite alterar quantidade, remover itens e navegar para checkout.  

---

## 🔐 Página Login
Autenticação de usuários cadastrados:
- Formulário de email e senha
- Validações de campo obrigatório
- Redirecionamento após login
- Botão para recuperação de senha

---

## 🎯 Componente Banner
O componente Banner exibe uma seção de destaque na página inicial, com mensagem de boas-vindas e subtítulo incentivando o usuário a explorar a loja.
Objetivo: tornar a interface inicial mais atrativa e acolhedora.

---

## 📦 Componente ProductList
Lista produtos dinamicamente:
- Recebe array de produtos do backend
- Renderiza `ProductCard` para cada item
- Possui filtragem e ordenação

---

## 🛍️ Componente ProductCard
Exibe informações de cada produto:
- Imagem
- Nome
- Preço
- Botão para adicionar ao carrinho
- Indica tamanho disponível

---

## 🛒 Contexto CartContext
Gerencia estado global do carrinho:
- Produtos adicionados
- Quantidade de itens
- Total do carrinho
- Funções para adicionar, remover e limpar produtos
- Compartilhado entre páginas e componentes

---

## 🔔 Componente CartMessage
Notificação temporária ao adicionar produto ao carrinho:
- Mostra imagem, nome, tamanho e preço
- Desaparece após 3 segundos ou pode ser fechado manualmente
- Botão “Ver carrinho” redireciona para `/carrinho`
- Não renderiza nada se não houver notificação

---

## 💳 Página Checkout
Seleciona opções do produto antes da compra:
- Exibe imagem, nome, preço e quantidade
- Seleção de tamanho (34 a 42)
- Controle de quantidade (mínimo 1)
- Total atualizado dinamicamente
- Botão de finalizar compra desabilitado até selecionar tamanho
- Redireciona para `/finalizar-compra`

---

## 🧾 Página FinalizarCompra
Conclui a compra:
- Lista produtos com imagem, nome, tamanho, quantidade e preço total
- Calcula valor total do pedido
- Preenche dados do usuário logado via API (CPF não editável)
- Seleção de pagamento: Pix, Boleto, Cartão
- Validações antes da finalização
- Mensagens temporárias de sucesso ou erro
- Remove produtos do carrinho após compra
- Exibe aviso se não houver produtos

---

## 🔘 Componente BtnFinalizarCompra
Botão reutilizável para finalizar compras:
- Texto personalizável via prop
- Executa função ao clicar (`onClick`)
- Suporta estado desabilitado
- Estilizado via `BtnFinalizarCompra.css`

---

## 💰 Componente AbaPix
Exibe opções Pix ou Boleto:
- `"pix"` → QR Code + chave Pix (com copiar)
- `"boleto"` → imagem do boleto
- Estilizado via `AbaPix.css`
- Integrado em `FinalizarCompra`

---

## 💳 Componente AbaCartao
Formulário de pagamento com cartão:
- Campos: número (16 dígitos), validade (MM/AA), CVV
- Navegação automática entre campos
- Valida e exibe mensagens de erro
- Integração com validação final da compra (`validarCartao`)
- Mostra dica visual do CVV via `AnimacaoCartao`
- Estilizado via `AbaCartao.css`

---

## 🎴 Componente AnimacaoCartao
Animação do cartão mostrando localização do CVV:
- Frente (chip) e verso (tarja)
- Valor do CVV exibido dinamicamente
- Destaque animado na área do CVV
- Usado em `AbaCartao`
- Estilizado via `AnimacaoCartao.css` com SVG

---

## 📝 Página de Cadastro
Formulário de registro de usuário:
- Campos: nome, CPF, email, senha/confirm, endereço completo
- Máscaras: CPF `000.000.000-00`, CEP `00000-000`
- Validações: campos obrigatórios, email, senha mínima, confirmação
- Integração com backend: `/usuario/dados-iniciais` e `/usuario/register`
- Mensagens de erro e redirecionamento para login
- Botão “Voltar”

---

## Página: EditarCadastro
Edição de dados do usuário logado:
- Carrega dados via `location.state.user`
- Campos editáveis: nome, CPF, email, senha (opcional), endereço
- Validações: obrigatórios, email, senha mínima e confirmação
- Integração backend: PUT `/usuario/editar/:id`
- Mensagens de sucesso/erro e redirecionamento para login
- Botão “Voltar”
- Máscaras: CPF e CEP

---

## Página: ForgotPassword
Recuperação de senha via email:
- Solicita email cadastrado
- API `POST /usuario/verificar-email`
- Se existe → redireciona para `EditarCadastro`
- Se não → mensagem de erro “Email não cadastrado”
- Botão “Voltar”

---

## Página: ResetPassword
Redefinição de senha com token:
- Recebe `token` via URL
- Solicita nova senha e confirmação
- Valida senhas coincidem
- API `POST /reset-password/:token`
- Mensagem de sucesso e redireciona para login
- Mensagem de erro exibida quando aplicável