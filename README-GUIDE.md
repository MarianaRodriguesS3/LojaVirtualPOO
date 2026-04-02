### Funcionalidades Frontend

## 🏠 Página Home

A página inicial é responsável por buscar e exibir os produtos disponíveis. Ao carregar, faz uma requisição à API (`/api/products`), armazenando os dados no estado com `useState`, enquanto o `useEffect` garante que a busca ocorra apenas na primeira renderização. Em caso de erro, uma mensagem é exibida no console.

### Componentes utilizados
- **Banner**: exibe mensagem de boas-vindas e incentiva a exploração dos produtos  
- **ProductList**: renderiza a listagem de produtos na tela  

Essa página funciona como porta de entrada da aplicação, exibindo os produtos de forma dinâmica a partir da API.

---

## 🧭 Componente Header

O Header gerencia a navegação principal e exibe informações do usuário, integrando acesso à Home, carrinho e área de login/usuário em uma interface fixa no topo.

### Funcionalidades
- Exibe um menu de navegação com:
  - Acesso à página inicial (Home)
  - Acesso ao carrinho
  - Área de usuário (login ou informações do usuário logado)

### Controle de usuário
- Dados do `localStorage` atualizados pelo `userToken`  
- Logout remove dados, reseta `CartContext` e redireciona para Home  

### Interações e feedback
- Navegação: carrinho → `/carrinho`, login → `/login`  
- Mensagem de boas-vindas por sessão (`sessionStorage`)  
- Ícones SVG e menus controlados por estado interno  
- Navegação com `react-router-dom`  

Esse componente é essencial para a experiência do usuário, centralizando a navegação e o acesso às principais funcionalidades do sistema.

---

## 🛒 Página Carrinho (Cart)

A página Cart exibe os produtos adicionados ao carrinho e permite ao usuário gerenciar suas compras de forma dinâmica.

### Funcionalidades
- Listagem de itens com imagem, nome, tamanho e preço total  
- Seleção de produtos para compra (checkbox, todos selecionados por padrão)  
- Controle de quantidade com atualização em tempo real  
- Remoção individual ou limpeza completa do carrinho  

### Cálculo e ações
- Total calculado dinamicamente considerando apenas itens selecionados  
- Comprar item individual ou finalizar compra com múltiplos itens  
- Alertas caso nenhum item esteja selecionado  

### Controle e integração
- Usuários não autenticados são redirecionados à Home  
- Usa `CartContext` para gerenciar itens e quantidades  
- Navegação com `react-router-dom`  

Centraliza toda a gestão do carrinho, permitindo revisar, ajustar e finalizar compras.

---

## 🔐 Página Login

A página Login autentica o usuário, permitindo acesso a funcionalidades protegidas como o carrinho de compras.

### Funcionalidades
- Login com email e senha  
- Validação de credenciais via API (`/usuario/login`)  
- Mensagens de erro em caso de falha  

### Processo de autenticação
- Armazena token e dados do usuário no `localStorage`  
- Atualiza estado global via `CartContext` para carregar o carrinho corretamente  
- Marca login recente no `sessionStorage`  
- Dispara evento global (`userLoggedIn`) para atualizar componentes como o Header  

### Navegação
- Redireciona à Home após login  
- Links para cadastro, recuperação de senha e voltar à página inicial  

### Segurança
- Isolamento do carrinho por usuário, evitando compartilhamento de dados  

Essencial para controle de acesso e experiência personalizada na aplicação.

---

## 🎯 Componente Banner

O Banner exibe uma seção de destaque na página inicial, com mensagem de boas-vindas e subtítulo incentivando a exploração dos produtos.

### Características
- Componente funcional simples, sem estado ou efeitos  
- Estilizado via `Banner.css`  
- Mostra título principal e subtítulo  

Tem como objetivo tornar a interface inicial mais atrativa e acolhedora para o usuário.

---

## 📦 Componente ProductList

O ProductList renderiza a lista de produtos na interface, recebendo via props o array `products` e utilizando o `ProductCard` para cada item.

### Funcionalidades
- Valida se `products` é um array válido  
- Exibe mensagem se não houver produtos  
- Percorre o array com `map` para renderizar cada `ProductCard`  

### Detalhes
- Cada produto recebe uma `key` única, preferindo `id` ou, se ausente, uma chave baseada no nome e valor aleatório  

Garante exibição dinâmica, segura e eficiente dos produtos na tela.

---

## 🛍️ Componente ProductCard

O ProductCard exibe as informações de um produto e permite interação do usuário, como seleção de tamanho, adição ao carrinho e compra direta.

### Funcionalidades
- Exibe imagem, nome, descrição e preço do produto  
- Seleção de tamanho via carrossel interativo (34 a 42) com destaque visual  
- Valida tamanho antes de comprar ou adicionar ao carrinho  

### Integração com o sistema
- Utiliza o `CartContext` para:
  - Adicionar produtos ao carrinho (`addToCart`)
  - Verificar autenticação do usuário (`userToken`)
  - Caso o usuário não esteja autenticado (`guest`) É redirecionado para a página de login ao tentar comprar ou adicionar ao carrinho.

### Ações
- **Adicionar ao carrinho** → produto com tamanho selecionado  
- **Comprar agora** → redireciona para checkout  

### Comportamentos adicionais
- Fecha seleção ao clicar fora do card  
- Reseta seleção após ação  
- Redirecionamento via `react-router-dom`  

Esse componente é essencial para a interação do usuário com os produtos, centralizando as principais ações de compra dentro da interface.

---

## 🛒 Contexto CartContext

O `CartContext` gerencia o estado do carrinho e a identificação do usuário, compartilhando dados e funções entre todos os componentes via Context API.

### Estados gerenciados
- **cartItems**: produtos adicionados ao carrinho  
- **userToken**: identificador do usuário (`localStorage`)  
- **notification**: exibe alertas ao adicionar itens  

### Persistência
- Carrinho armazenado no `localStorage` por usuário (`cartItems_guest` ou `cartItems_12345`)  
- Sincronização automática ao atualizar o carrinho  

### Funcionalidades
- **addToCart(product)**: adiciona ou incrementa quantidade de produto, com notificação  
- **removeFromCart(id, size, name)**: remove item específico  
- **updateQuantity(id, size, name, newQty)**: altera quantidade, mínimo 1  
- **clearCart()**: limpa todo o carrinho  

### Controle de usuário
- **updateUserToken(newUserId)**: atualiza usuário e carrega/mistura carrinho do guest  
- **logout()**: redefine usuário para "guest"  

Esse contexto é essencial para o funcionamento do e-commerce, mantendo carrinhos separados por usuário, garantindo persistência e centralizando toda a lógica de gerenciamento do carrinho e sessão do usuário.

---

## 🔔 Componente CartMessage

O CartMessage exibe uma notificação visual temporária sempre que um produto é adicionado ao carrinho, utilizando o `CartContext` para acessar o estado de notificação.

### Funcionalidades
- Mensagem de confirmação com imagem, nome, tamanho e preço do produto  
- Desaparece automaticamente em 3 segundos ou pode ser fechada manualmente  

### Interações
- **Fechar notificação** → remove imediatamente a mensagem  
- **Ver carrinho** → redireciona para `/carrinho` e limpa a notificação  

### Comportamentos adicionais
- Não renderiza quando não há notificação  
- Usa `useEffect` para controlar tempo de exibição  
- Integração com navegação via `react-router-dom`  

Fornece feedback imediato, melhorando a experiência do usuário ao adicionar produtos ao carrinho.

---

## 💳 Página Checkout

A página Checkout exibe os detalhes do produto selecionado e permite finalizar a compra, garantindo a escolha correta de tamanho e quantidade.

### Funcionalidades
- Mostra imagem, nome e preço do produto (considerando quantidade)  
- Seleção de tamanho (34 a 42) com destaque visual  
- Controle de quantidade (mínimo 1)  
- Total atualizado dinamicamente  

### Finalização
- Botão de finalizar compra desabilitado até selecionar tamanho  
- Redireciona para `/finalizar-compra` enviando produto, tamanho e quantidade  
- Usa o componente `BtnFinalizarCompra` para padronizar ação  

### Controle de estado
- Dados do produto via `react-router-dom` (`location.state`)  
- Exibe mensagem se nenhum item foi selecionado  

Prepara os dados da compra antes da finalização, garantindo experiência segura e intuitiva ao usuário.

---

## 🧾 Página FinalizarCompra

A página FinalizarCompra conclui o processo de compra, exibindo os produtos selecionados, coletando dados do cliente e permitindo a escolha da forma de pagamento.

### Funcionalidades
- Lista produtos com imagem, nome, tamanho, quantidade e preço total  
- Calcula e exibe o valor total do pedido  

### Dados do cliente
- Preenche automaticamente informações do usuário logado (nome, CPF, endereço) via API  
- Campos editáveis: nome e endereço; CPF não editável  

### Formas de pagamento
- Seleção entre Pix, Boleto e Cartão  
- Exibe dinamicamente conteúdo das abas (`AbaPix` e `AbaCartao`)  
- Alternância entre abas  

### Validação e finalização
- Valida seleção da forma de pagamento  
- Pagamento com cartão: valida dados adicionais  
- Ao finalizar:
  - Mensagem de sucesso
  - Remove itens comprados do carrinho  

### Feedback
- Mensagens temporárias de erro ou sucesso, desaparecendo automaticamente  

### Integrações
- `CartContext` para gerenciar carrinho  
- API para buscar dados do usuário  
- Componentes auxiliares: `AbaPix`, `AbaCartao`, `BtnFinalizarCompra`  

### Controle de acesso
- Exibe mensagem se não houver produtos para finalizar  

Etapa final do fluxo de compra, reunindo todas as informações necessárias para concluir o pedido de forma segura e organizada.

---

## 🔘 Componente BtnFinalizarCompra

O BtnFinalizarCompra é um botão reutilizável para ações de finalização de compra em diversas partes da aplicação.

### Funcionalidades
- Texto personalizável via prop `texto` (padrão: "Finalizar Compra")  
- Executa ação ao ser clicado (`onClick`)  
- Pode ser desabilitado (`disabled`) para impedir interação  

### Personalização e uso
- Estilizado com `BtnFinalizarCompra.css`  
- Reutilizável em carrinho, checkout e finalização de pedido, mantendo consistência visual  

Padroniza botões de ação de compra, garantindo interface consistente e reutilização de código.

---

## 💰 Componente AbaPix

O AbaPix exibe as opções de pagamento via Pix ou Boleto na finalização da compra.

### Funcionalidades
- Conteúdo dinâmico via prop `tipo`:
  - `"pix"` → QR Code e chave Pix, com opção de copiar  
  - `"boleto"` → imagem do boleto bancário  

### Personalização e uso
- Imagens locais para QR Code e boleto  
- Estilizado com `AbaPix.css`  
- Usado na página de finalização de compra, integrado ao sistema de seleção de pagamento  

Oferece interface clara e direta para métodos de pagamento alternativos.

---

## 💳 Componente AbaCartao

O AbaCartao exibe e gerencia o formulário de pagamento com cartão de crédito na finalização da compra.

### Funcionalidades
- Preenchimento de número do cartão (16 dígitos), validade (MM/AA) e CVV  
- Campos individuais para o número do cartão com navegação automática e suporte à digitação/exclusão  

### Validação, Segurança e integração
- Número do cartão: 16 dígitos  
- Validade: mês entre 01-12, ano maior que o atual  
- CVV: 3 dígitos  
- Exibe mensagens de erro se houver dados incorretos
- Função global `validarCartao` para validação final  
- Integrado ao fluxo de pagamento da aplicação  

### Interações inteligentes
- Avança ou retorna entre campos automaticamente  
- Divide mês/ano e move foco dinamicamente  
- Dica visual do CVV com `AnimacaoCartao`  

Oferece experiência segura, interativa e validada para pagamentos com cartão.

---

## 🎴 Componente AnimacaoCartao

O AnimacaoCartao exibe uma animação visual de um cartão de crédito, destacando a localização do CVV.

### Funcionalidades
- Mostra frente (com chip) e verso (com área do CVV) do cartão
- Destaca a área do CVV com animação elíptica  

### Animação
- Efeito de flip entre frente e verso para orientar a localização do código  

### Uso e personalização
- Utilizado dentro de `AbaCartao`, ativado ao clicar no ícone de ajuda do CVV  
- Estilizado via `AnimacaoCartao.css` e SVG para destaque animado  

Fornece orientação visual clara e melhora a experiência do usuário no preenchimento do CVV.

---

## 📝 Página de Cadastro

A página Cadastro permite que novos usuários criem uma conta, preenchendo informações pessoais, login e endereço.

### Funcionalidades
- Formulário com nome, CPF, email, senha (com confirmação) e endereço completo  
- Validações e máscaras: CPF e CEP formatados automaticamente, email válido, senha mínima 8 caracteres e confirmação, campos obrigatórios  
- Integração com backend: carrega dados iniciais (`/usuario/dados-iniciais`) e envia registro via POST (`/usuario/register`)  
- Feedback: redireciona ao login após sucesso e exibe mensagens de erro 
- Todos os dados sensíveis (senha, CPF) são tratados e enviados para a API.

### Uso
- Rota de cadastro do aplicativo, com botão de retorno à página inicial  
- Permite criação de conta e preenchimento seguro de dados do usuário

---

## ✏️ Página EditarCadastro

A página EditarCadastro permite que o usuário logado edite seus dados pessoais, login e endereço.

### Funcionalidades
- Carrega dados do usuário via `location.state.user`  
- Permite editar nome, CPF, email, senha (opcional) e endereço completo  
- Valida campos obrigatórios, formato de email e senha (mínimo 8 caracteres e confirmação)  
- Integração com backend (`PUT /usuario/editar/:id`)  
- Mostra mensagens de sucesso ou erro e redireciona para login após 2 segundos  
- Botão "Voltar" para login  

### Estados e hooks
- `useState` para dados do usuário e mensagens  
- `useEffect` para carregar dados iniciais  
- `useLocation` e `useNavigate` para navegação  

### Funções principais
- `formatCpf` e `formatCep` para máscaras  
- `handleUpdate` envia dados atualizados ao backend com validação

Permite atualização segura e intuitiva dos dados do usuário.

---

## 🔑 Página ForgotPassword

A página ForgotPassword permite ao usuário recuperar a senha informando o email cadastrado.

### Funcionalidades
- Solicita email do usuário e valida campo não vazio  
- Chama API (`POST /usuario/verificar-email`) para verificar existência do email  
- Se existir: redireciona para `EditarCadastro` com dados via `location.state`  
- Se não existir: exibe mensagem "Email não cadastrado"  

### Estados e hooks
- `useState`: `email` e `error`  
- `useNavigate` para redirecionamento  

### Formulário
- Input de email  
- Botão "Continuar" → valida e chama API  
- Botão "Voltar" → retorna ao login  
- Mensagem de erro exibida abaixo do formulário  

Fornece fluxo seguro e intuitivo para recuperação de senha.

---

## 🔐 Página ResetPassword

A página ResetPassword permite redefinir a senha do usuário usando um token de recuperação.

### Funcionalidades
- Recebe `token` da URL via `useParams`  
- Solicita nova senha e confirmação, validando se coincidem  
- Chama API (`POST /reset-password/:token`) para atualizar a senha  
- Sucesso: mensagem "Senha redefinida com sucesso!" e redireciona para login após 2 segundos  
- Erro: exibe mensagem da API ou "Erro ao redefinir senha"  

### Estados e hooks
- `useState`: `password`, `confirm`, `message`  
- `useParams` para token e `useNavigate` para redirecionamento  

### Formulário
- Inputs para senha e confirmação  
- Botão "Redefinir senha" → valida e chama API  
- Mensagem de feedback exibida abaixo do formulário  

Proporciona fluxo seguro e intuitivo para redefinição de senha.