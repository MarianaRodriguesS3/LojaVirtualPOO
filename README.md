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


### Funcionalidades Frontend

## 🏠 Página Home

A página inicial do sistema é responsável por buscar e exibir os produtos disponíveis.

Ao ser carregada, realiza uma requisição HTTP para a API (`/api/products`) para obter a lista de produtos do backend. Os dados retornados são armazenados no estado `products` utilizando o hook `useState`.

O hook `useEffect` é utilizado para garantir que a busca dos produtos aconteça apenas uma vez, assim que a página é renderizada.

Caso ocorra algum erro durante a requisição, uma mensagem é exibida no console para facilitar o diagnóstico.

### Componentes utilizados

- **Banner**: recebe a lista de produtos e pode exibir destaques ou informações visuais relevantes.
- **ProductList**: recebe o array de produtos e renderiza a listagem completa na tela.

Essa página funciona como ponto de entrada da aplicação, exibindo dinamicamente os produtos a partir dos dados fornecidos pela API.

## 🧭 Componente Header

O componente Header é responsável pela navegação principal da aplicação e pelo controle de exibição das informações do usuário.

Ele integra funcionalidades de navegação, autenticação e acesso ao carrinho, proporcionando uma interface consistente no topo da aplicação.

### Funcionalidades

- Exibe um menu de navegação com:
  - Acesso à página inicial (Home)
  - Acesso ao carrinho
  - Área de usuário (login ou informações do usuário logado)

- Mostra diferentes opções dependendo do estado do usuário:
  - Usuário não autenticado:
    - Exibe botão para realizar login
  - Usuário autenticado:
    - Exibe o nome do usuário
    - Permite abrir um menu com opção de logout

### Controle de usuário

- Recupera os dados do usuário a partir do `localStorage`.
- Atualiza automaticamente quando o `userToken` muda.
- Permite realizar logout:
  - Remove dados do usuário do `localStorage`
  - Reseta o estado global através do `CartContext`
  - Redireciona para a página inicial

### Interações

- **Carrinho**:
  - Redireciona para a página `/carrinho`

- **Login**:
  - Redireciona para a página `/login`

- **Menu do usuário**:
  - Exibe opções adicionais (como sair da conta)

### Feedback visual

- Exibe uma mensagem de boas-vindas após o login:
  - Mostrada apenas uma vez por sessão (controlada via `sessionStorage`)
  - Desaparece automaticamente após alguns segundos

### Comportamentos adicionais

- Utiliza ícones SVG para representar o carrinho e o usuário.
- Controla a exibição de menus com estados internos.
- Utiliza `react-router-dom` para navegação entre páginas.

Esse componente é essencial para a experiência do usuário, centralizando a navegação e o acesso às principais funcionalidades do sistema.

## 🛒 Página Carrinho (Cart)

A página Cart é responsável por exibir os produtos adicionados ao carrinho e permitir que o usuário gerencie suas compras.

### Funcionalidades

- Exibe todos os itens adicionados ao carrinho com:
  - Imagem do produto
  - Nome
  - Tamanho (se disponível)
  - Preço total por item (considerando a quantidade)

- Permite selecionar quais produtos serão incluídos na compra:
  - Cada item possui um checkbox para seleção
  - Por padrão, todos os itens são selecionados automaticamente

- Controle de quantidade:
  - Botões para aumentar ou diminuir a quantidade de cada produto
  - Atualiza os valores em tempo real

- Remoção de itens:
  - Permite remover produtos individualmente do carrinho

### Cálculo do total

- O valor total é calculado dinamicamente com base:
  - Apenas nos itens selecionados
  - Na quantidade de cada produto

### Ações disponíveis

- **Comprar item individual**:
  - Redireciona para a página de finalização com apenas o item selecionado

- **Finalizar compra (múltiplos itens)**:
  - Envia apenas os produtos marcados para a página de checkout
  - Exibe alerta caso nenhum item esteja selecionado

- **Limpar carrinho**:
  - Remove todos os itens do carrinho

### Controle de acesso

- Usuários não autenticados (`guest`) são redirecionados automaticamente para a página inicial

### Estados da interface

- Se o carrinho estiver vazio:
  - Exibe uma mensagem informando que não há produtos adicionados

### Integrações

- Utiliza o `CartContext` para:
  - Obter os itens do carrinho
  - Atualizar quantidade
  - Remover itens
  - Limpar o carrinho

- Utiliza `react-router-dom` para navegação entre páginas

Esse componente centraliza toda a gestão do carrinho, permitindo ao usuário revisar, ajustar e finalizar suas compras de forma dinâmica.

## 🔐 Página Login

A página Login é responsável pela autenticação do usuário na aplicação, permitindo o acesso às funcionalidades protegidas, como o carrinho de compras.

### Funcionalidades

- Permite que o usuário faça login informando:
  - Email
  - Senha

- Realiza uma requisição para a API (`/usuario/login`) para validar as credenciais.

- Exibe mensagens de erro caso o login falhe.

### Processo de autenticação

- Após o login bem-sucedido:
  - Obtém os dados do usuário e o token de autenticação retornados pela API.
  - Define um identificador único do usuário (ID ou email).
  - Atualiza o estado global através do `CartContext`, garantindo que o carrinho seja carregado corretamente para o usuário logado.
  - Armazena o token e os dados do usuário no `localStorage`.
  - Marca o login como recente utilizando `sessionStorage`.

### Integrações

- Utiliza o `CartContext`:
  - Para atualizar o identificador do usuário (`updateUserToken`)
  - Garantindo isolamento e persistência do carrinho por usuário

- Dispara um evento global (`userLoggedIn`) para atualização de componentes como o Header.

- Utiliza `react-router-dom`:
  - Para navegação após login (redirecionamento para a Home)
  - Para links de navegação (registro, recuperação de senha e retorno)

### Navegação adicional

- Link para cadastro de novo usuário
- Link para recuperação de senha
- Botão para voltar à página inicial

### Segurança

- Garante que cada usuário tenha seu próprio carrinho isolado.
- Evita compartilhamento de dados entre diferentes usuários.

Essa página é essencial para o controle de acesso da aplicação, permitindo uma experiência personalizada e segura para cada usuário.

## 🎯 Componente Banner

O componente Banner é responsável por exibir uma seção de destaque na página inicial da aplicação.

Ele apresenta uma mensagem de boas-vindas ao usuário, acompanhada de um subtítulo incentivando a exploração dos produtos disponíveis na loja.

### Características

- Componente funcional simples, sem uso de estado ou efeitos colaterais.
- Utiliza um arquivo de estilos (`Banner.css`) para personalização visual.
- Exibe:
  - Um título principal de boas-vindas.
  - Um subtítulo com chamada para ação.

Esse componente tem como objetivo melhorar a experiência inicial do usuário, tornando a interface mais atrativa e acolhedora.

## 📦 Componente ProductList

O componente ProductList é responsável por renderizar a lista de produtos na interface.

Ele recebe via props um array de produtos (`products`) e exibe cada item utilizando o componente `ProductCard`.

### Funcionalidades

- Valida se a prop `products` é um array antes de renderizar.
- Caso não seja um array válido, o componente não renderiza nada.
- Se o array estiver vazio, exibe uma mensagem informando que não há produtos disponíveis.
- Percorre a lista de produtos utilizando `map` e renderiza um `ProductCard` para cada item.

### Detalhes importantes

- Cada produto recebe uma `key` única:
  - Prioriza o uso do `id` do produto.
  - Caso não exista, gera uma chave alternativa baseada no nome e um valor aleatório.

Esse componente é responsável por organizar e exibir dinamicamente os produtos na tela, garantindo uma renderização segura e eficiente.

## 🛍️ Componente ProductCard

O componente ProductCard é responsável por exibir as informações individuais de um produto e permitir a interação do usuário, como seleção de tamanho, adição ao carrinho e compra direta.

### Funcionalidades

- Exibe os dados do produto:
  - Imagem
  - Nome
  - Descrição
  - Preço formatado

- Permite a seleção de tamanho por meio de um carrossel interativo:
  - Exibe uma lista de tamanhos disponíveis (34 a 42).
  - O usuário pode navegar pelos tamanhos movendo o mouse horizontalmente.
  - O tamanho selecionado é destacado visualmente.

- Valida a seleção de tamanho:
  - Caso o usuário tente comprar ou adicionar ao carrinho sem selecionar um tamanho, uma mensagem de erro é exibida.

### Integração com o sistema

- Utiliza o `CartContext` para:
  - Adicionar produtos ao carrinho (`addToCart`)
  - Verificar autenticação do usuário (`userToken`)

- Caso o usuário não esteja autenticado (`guest`):
  - É redirecionado para a página de login ao tentar comprar ou adicionar ao carrinho.

### Ações disponíveis

- **Adicionar ao carrinho**:
  - Adiciona o produto com o tamanho selecionado ao carrinho.

- **Comprar agora**:
  - Redireciona o usuário para a página de checkout com o produto selecionado.

### Comportamentos adicionais

- Fecha automaticamente a seleção de tamanho ao clicar fora do card.
- Reseta o estado de seleção após adicionar ao carrinho ou iniciar a compra.
- Utiliza navegação com `react-router-dom` para redirecionamentos entre páginas.

Esse componente é essencial para a interação do usuário com os produtos, centralizando as principais ações de compra dentro da interface.

## 🛒 Contexto CartContext

O CartContext é responsável por gerenciar todo o estado do carrinho de compras e a identificação do usuário na aplicação. Ele utiliza a Context API do React para compartilhar dados e funções relacionadas ao carrinho entre todos os componentes.

### Estados gerenciados

- **cartItems**: lista de produtos adicionados ao carrinho.
- **userToken**: identificador do usuário (armazenado no localStorage).
- **notification**: controla notificações ao adicionar produtos ao carrinho.

### Persistência de dados

- Os dados do carrinho são armazenados no `localStorage`.
- Cada usuário possui um carrinho separado. A chave utilizada no `localStorage` é formada por `cartItems_` seguido do identificador do usuário, por exemplo: `cartItems_guest` ou `cartItems_12345`.
- Sempre que o carrinho é atualizado, os dados são automaticamente sincronizados com o `localStorage`.

### Funcionalidades principais

- **addToCart(product)**: adiciona um produto ao carrinho. Se o produto já existir (mesmo id, nome e tamanho), apenas incrementa a quantidade. Dispara uma notificação ao adicionar o item.
- **removeFromCart(id, size, name)**: remove um item específico do carrinho.
- **updateQuantity(id, size, name, newQty)**: atualiza a quantidade de um item no carrinho. Impede valores menores que 1.
- **clearCart()**: remove todos os itens do carrinho.

### Controle de usuário

- **updateUserToken(newUserId)**: atualiza o identificador do usuário e carrega o carrinho correspondente. Caso um usuário convidado (guest) faça login, os itens do carrinho de convidado são mesclados com o carrinho do usuário logado.
- **logout()**: redefine o usuário para "guest".

### Comportamentos adicionais

- Mantém carrinhos separados por usuário.
- Mescla automaticamente carrinhos ao realizar login.
- Garante persistência dos dados mesmo após recarregar a página.

Esse contexto é essencial para o funcionamento do e-commerce, centralizando toda a lógica de gerenciamento do carrinho e da sessão do usuário.

## 🔔 Componente CartMessage

O componente CartMessage é responsável por exibir uma notificação visual sempre que um produto é adicionado ao carrinho.

Ele utiliza o CartContext para acessar e controlar o estado de notificação, exibindo temporariamente um resumo do produto adicionado.

### Funcionalidades

- Exibe uma mensagem de confirmação ao adicionar um item ao carrinho.
- Mostra informações do produto:
  - Imagem
  - Nome
  - Tamanho (se disponível)
  - Preço

- A notificação é exibida de forma temporária:
  - Desaparece automaticamente após 3 segundos.
  - Pode ser fechada manualmente pelo usuário.

### Interações

- **Fechar notificação**:
  - Remove a mensagem da tela imediatamente.

- **Ver carrinho**:
  - Redireciona o usuário para a página de carrinho (`/carrinho`).
  - Limpa a notificação ao navegar.

### Comportamentos adicionais

- O componente não renderiza nada quando não há notificação ativa.
- Utiliza `useEffect` para controlar o tempo de exibição da mensagem.
- Integra-se com o sistema de navegação usando `react-router-dom`.

Esse componente melhora a experiência do usuário ao fornecer feedback imediato após a adição de produtos ao carrinho.

## 💳 Página Checkout

A página Checkout é responsável por exibir os detalhes de um produto selecionado para compra e permitir que o usuário finalize o pedido.

### Funcionalidades

- Exibe as informações do produto selecionado:
  - Imagem
  - Nome
  - Preço (calculado com base na quantidade)

- Permite a seleção de tamanho:
  - Exibe opções de tamanhos disponíveis (34 a 42)
  - Destaca visualmente o tamanho selecionado

- Controle de quantidade:
  - Permite aumentar ou diminuir a quantidade do produto
  - Garante que a quantidade mínima seja 1

### Cálculo do total

- O valor total é atualizado dinamicamente com base:
  - No preço do produto
  - Na quantidade selecionada

### Finalização da compra

- O botão de finalizar compra:
  - Fica desabilitado enquanto nenhum tamanho for selecionado
  - Atualiza o texto dinamicamente para orientar o usuário

- Ao finalizar:
  - Redireciona para a página `/finalizar-compra`
  - Envia o produto selecionado com:
    - Tamanho
    - Quantidade

### Controle de estado

- Recebe os dados do produto através do `react-router-dom` (`location.state`)
- Caso nenhum produto seja fornecido:
  - Exibe uma mensagem informando que não há item selecionado

### Integrações

- Utiliza o componente `BtnFinalizarCompra` para padronizar a ação de compra
- Utiliza `react-router-dom` para navegação entre páginas

Essa página é responsável por preparar os dados da compra antes da finalização, garantindo que o usuário selecione corretamente as opções do produto.

## 🧾 Página FinalizarCompra

A página FinalizarCompra é responsável por concluir o processo de compra, exibindo os produtos selecionados, coletando dados do cliente e permitindo a escolha da forma de pagamento.

### Funcionalidades

- Exibe todos os produtos selecionados para compra com:
  - Imagem
  - Nome
  - Tamanho (se disponível)
  - Quantidade
  - Preço total por item

- Calcula e exibe o valor total do pedido com base nos produtos selecionados.

### Dados do cliente

- Preenche automaticamente os dados do usuário logado através da API:
  - Nome
  - CPF
  - Endereço completo

- Permite edição dos campos:
  - Nome
  - Endereço

- O CPF é exibido como campo não editável.

### Formas de pagamento

- Permite selecionar entre:
  - Pix
  - Boleto
  - Cartão

- Exibe dinamicamente o conteúdo conforme a opção escolhida:
  - **AbaPix**: utilizada para Pix e boleto
  - **AbaCartao**: utilizada para pagamento com cartão

- Permite alternar entre as abas de pagamento.

### Validação e finalização

- Valida se uma forma de pagamento foi selecionada antes de finalizar.
- Para pagamento com cartão:
  - Executa uma validação adicional dos dados do cartão.

- Ao finalizar a compra:
  - Exibe uma mensagem de sucesso
  - Remove os produtos comprados do carrinho

### Feedback ao usuário

- Exibe mensagens temporárias:
  - Erro (ex: forma de pagamento não selecionada)
  - Sucesso (compra finalizada)

- As mensagens desaparecem automaticamente após alguns segundos.

### Integrações

- Utiliza o `CartContext`:
  - Para remover os itens comprados do carrinho

- Utiliza a API:
  - Para buscar os dados do usuário autenticado

- Utiliza componentes auxiliares:
  - `AbaPix`
  - `AbaCartao`
  - `BtnFinalizarCompra`

### Controle de acesso

- Caso nenhum produto seja fornecido:
  - Exibe uma mensagem informando que não há itens para finalizar

Essa página representa a etapa final do fluxo de compra, reunindo todas as informações necessárias para concluir o pedido de forma organizada e segura.

## 🔘 Componente BtnFinalizarCompra

O componente BtnFinalizarCompra é um botão reutilizável utilizado para ações de finalização de compra em diferentes partes da aplicação.

### Funcionalidades

- Exibe um botão com texto personalizável:
  - Por padrão: "Finalizar Compra"
  - Pode ser alterado via prop `texto`

- Permite executar uma ação ao ser clicado:
  - Recebe uma função através da prop `onClick`

- Suporte a estado desabilitado:
  - Pode ser desativado via prop `disabled`
  - Impede interação do usuário quando necessário

### Personalização

- Utiliza um arquivo de estilos (`BtnFinalizarCompra.css`) para definição da aparência visual
- Pode ser reutilizado em diferentes páginas mantendo consistência na interface

### Uso

- Utilizado em fluxos de compra, como:
  - Carrinho
  - Checkout
  - Finalização de pedido

Esse componente ajuda a padronizar os botões de ação relacionados à compra, garantindo consistência visual e reutilização de código.

## 💰 Componente AbaPix

O componente AbaPix é responsável por exibir as opções de pagamento via Pix ou Boleto na etapa de finalização da compra.

### Funcionalidades

- Renderiza diferentes conteúdos com base no tipo de pagamento recebido pela prop `tipo`:
  - `"pix"`: exibe informações para pagamento via Pix
  - `"boleto"`: exibe o boleto bancário

### Pagamento via Pix

- Exibe:
  - Um QR Code para pagamento
  - Uma chave Pix fixa

- Permite copiar a chave Pix:
  - Utiliza a API do navegador (`clipboard`) para copiar automaticamente ao clicar no botão

### Pagamento via Boleto

- Exibe uma imagem representando o boleto bancário

### Personalização

- Utiliza imagens locais:
  - QR Code (Pix)
  - Boleto bancário

- Estilização feita através do arquivo `AbaPix.css`

### Uso

- Utilizado na página de finalização de compra
- Integrado com o sistema de seleção de formas de pagamento

Esse componente simplifica a exibição de métodos de pagamento alternativos, oferecendo uma interface clara e direta para o usuário.

## 💳 Componente AbaCartao

O componente AbaCartao é responsável por exibir e gerenciar o formulário de pagamento com cartão de crédito na etapa de finalização da compra.

### Funcionalidades

- Permite o preenchimento dos dados do cartão:
  - Número do cartão (16 dígitos)
  - Validade (mês e ano)
  - CVV

- O número do cartão é inserido em campos individuais:
  - Dividido em grupos de 4 dígitos
  - Navegação automática entre os campos
  - Suporte a digitação e exclusão com movimentação do cursor

### Validação de dados

- Valida os dados do cartão antes da finalização da compra:
  - Número do cartão deve conter 16 dígitos
  - Validade deve estar preenchida corretamente (MM/AA)
  - Mês deve estar entre 01 e 12
  - Ano deve ser maior que o atual (evita cartão expirado)
  - CVV deve conter 3 dígitos

- Em caso de erro:
  - Exibe mensagens de feedback ao usuário

### Interações inteligentes

- Avança automaticamente entre os campos ao digitar
- Retorna para o campo anterior ao apagar
- Divide automaticamente valores digitados entre mês e ano
- Move o foco entre campos de forma dinâmica

### Segurança e integração

- Expõe uma função global (`validarCartao`) para ser utilizada na validação final da compra
- Integra-se com o fluxo de pagamento da aplicação

### Experiência do usuário

- Exibe uma dica visual do CVV ao clicar no ícone de ajuda
- Utiliza o componente `AnimacaoCartao` para demonstrar onde localizar o CVV
- Interface interativa e intuitiva para preenchimento dos dados

### Personalização

- Estilização feita através do arquivo `AbaCartao.css`
- Layout organizado em seções para melhor usabilidade

Esse componente oferece uma experiência completa e validada para pagamentos com cartão, garantindo maior segurança e facilidade para o usuário durante a compra.

## 🎴 Componente AnimacaoCartao

O componente AnimacaoCartao é responsável por exibir uma animação visual de um cartão de crédito, destacando a localização do código CVV.

### Funcionalidades

- Renderiza uma representação visual de um cartão:
  - Frente do cartão (com chip)
  - Verso do cartão (com área do CVV)

- Exibe dinamicamente o valor do CVV informado pelo usuário.

- Destaca visualmente a área do CVV:
  - Utiliza uma animação com um elemento elíptico para chamar atenção para a região correta

### Animação

- Simula o efeito de rotação do cartão (flip), mostrando frente e verso
- Ajuda o usuário a entender onde encontrar o código de segurança

### Uso

- Utilizado dentro do componente `AbaCartao`
- Exibido ao clicar no ícone de ajuda do campo CVV

### Personalização

- Estilização feita através do arquivo `AnimacaoCartao.css`
- Utiliza SVG para criar o efeito de destaque animado

Esse componente melhora a experiência do usuário ao fornecer uma orientação visual clara sobre onde localizar o CVV no cartão.

## 📝 Página de Cadastro

A página `Cadastro` é responsável por fornecer a interface para o usuário criar uma nova conta no sistema, incluindo informações pessoais, login e endereço.

### Funcionalidades

- **Formulário completo de registro:**
  - Nome e CPF
  - Email e senha (com confirmação)
  - Endereço completo (CEP, rua, número, bairro, cidade, estado)

- **Validações e máscaras:**
  - CPF formatado automaticamente
  - CEP formatado automaticamente
  - Validação de email válido
  - Validação de senha mínima de 8 caracteres e confirmação
  - Verificação de campos obrigatórios

- **Integração com backend:**
  - Carrega dados iniciais se existentes (`/usuario/dados-iniciais`)
  - Envia registro via POST para `/usuario/register`

- **Navegação e feedback:**
  - Redireciona para página de login após cadastro bem-sucedido
  - Exibe mensagens de erro quando algum campo está inválido ou backend retorna erro

### Máscaras de entrada

- CPF: `000.000.000-00`
- CEP: `00000-000`

### Uso

- Renderizada na rota de cadastro do aplicativo.
- Permite que novos usuários criem uma conta e preencham seus dados de endereço.

### Observações

- A formatação e validação são feitas no frontend.
- Todos os dados sensíveis (senha, CPF) são tratados e enviados para a API.
- Inclui botão de retorno para a página inicial.

## Página: EditarCadastro

Página para edição dos dados do usuário logado.

### Funcionalidades
- Carrega os dados do usuário enviado via `location.state.user`.
- Permite editar:
  - Nome
  - CPF (com máscara)
  - Email
  - Senha (opcional)
  - Confirmação de senha
  - Endereço completo: CEP (com máscara), rua, número, bairro, cidade e estado
- Validações:
  - Campos obrigatórios (nome e email)
  - Formato de email
  - Senha mínima de 8 caracteres
  - Senha e confirmação coincidem
- Integração com backend via `PUT /usuario/editar/:id`
- Mostra mensagens de sucesso ou erro
- Redireciona para login 2 segundos após atualização
- Botão "Voltar" para login

### Máscaras
- CPF: `000.000.000-00`
- CEP: `00000-000`

### Estados (useState)
- `nome`, `cpf`, `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`, `email`
- `password`, `confirmPassword`
- `message` (mensagem de sucesso)
- `error` (mensagem de erro)

### Hooks
- `useEffect` para carregar os dados iniciais do usuário
- `useLocation` para receber o usuário via `state`
- `useNavigate` para redirecionamento

### Funções
- `formatCpf(value)`: aplica máscara de CPF
- `formatCep(value)`: aplica máscara de CEP
- `handleCpfChange(e)`: atualiza estado do CPF com máscara
- `handleCepChange(e)`: atualiza estado do CEP com máscara
- `handleUpdate(e)`: envia dados atualizados para o backend com validação

### Botões
- Atualizar: envia formulário
- Voltar: retorna para a página de login

## Página: ForgotPassword

Página para recuperação de senha via email.

### Funcionalidades
- Solicita ao usuário informar o email cadastrado.
- Valida se o campo email não está vazio.
- Chama a API `POST /usuario/verificar-email` para checar se o email existe.
- Se o email existir:
  - Redireciona para a página `EditarCadastro`, enviando os dados do usuário via `location.state`.
- Se o email não existir:
  - Mostra mensagem de erro "Email não cadastrado".

### Estados (useState)
- `email` – email informado pelo usuário
- `error` – mensagem de erro exibida na tela

### Hooks
- `useNavigate` – para redirecionar o usuário entre páginas

### Formulário
- Input de email
- Botão "Continuar" → valida e chama a API
- Mensagem de erro exibida abaixo do formulário, se houver
- Botão "Voltar" → retorna para a página de login

## Página: ResetPassword

Página para redefinição de senha usando token de recuperação.

### Funcionalidades
- Recebe o `token` da URL via `useParams`.
- Solicita ao usuário digitar a nova senha e confirmá-la.
- Valida se os campos de senha coincidem.
- Chama a API `POST /reset-password/:token` enviando a nova senha.
- Se sucesso:
  - Exibe mensagem "Senha redefinida com sucesso!"
  - Redireciona para a página de login após 2 segundos.
- Se erro:
  - Exibe a mensagem retornada pela API ou "Erro ao redefinir senha".

### Estados (useState)
- `password` – nova senha informada pelo usuário
- `confirm` – confirmação da nova senha
- `message` – mensagem de feedback (erro ou sucesso)

### Hooks
- `useParams` – para obter o token da URL
- `useNavigate` – para redirecionar o usuário após redefinir a senha

### Formulário
- Input para nova senha
- Input para confirmação da senha
- Botão "Redefinir senha" → valida e chama a API
- Mensagem de feedback exibida abaixo do formulário