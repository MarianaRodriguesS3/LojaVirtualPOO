<a name="secao-frontend"></a>### Funcionalidades Frontend

## <a name="home"></a>🏠 Página Home

A página inicial é responsável por buscar e exibir os produtos disponíveis. Ao ser carregada, faz uma requisição à API (/api/products), armazenando os dados no estado com useState, enquanto o useEffect garante que a busca ocorra apenas na primeira renderização. Em caso de erro, uma mensagem é exibida no console.

### Componentes utilizados
- Banner: exibe mensagem de boas-vindas e incentiva a exploração dos produtos  
- ProductList: renderiza a listagem de produtos na tela  

Essa página funciona como porta de entrada da aplicação, exibindo os produtos de forma dinâmica a partir dos dados recebidos da API.

---

## <a name="header"></a>🧭 Componente Header

O Header gerencia a navegação principal da aplicação, oferecendo acesso à Home, carrinho e área do usuário.

### Funcionalidades
- Navegação entre páginas com react-router-dom  
- Exibição de login ou informações do usuário autenticado  
- Controle de logout integrado ao CartContext  
- Leitura dos dados do usuário no localStorage  
- Mensagem de boas-vindas exibida uma vez por sessão  
- Controle de menu dropdown e estados internos com useState  

O componente centraliza a navegação e o gerenciamento da autenticação, contribuindo para a experiência do usuário na aplicação.

---

## <a name="cart"></a>🛒 Página Carrinho (Cart)

A página Cart exibe e gerencia os produtos adicionados ao carrinho, permitindo ao usuário revisar e finalizar suas compras.

### Funcionalidades
- Listagem de itens com imagem, nome, tamanho e preço  
- Seleção de produtos para compra com checkbox  
- Controle de quantidade em tempo real  
- Remoção individual ou limpeza completa do carrinho  
- Cálculo automático do total com base nos itens selecionados  
- Compra de item único ou finalização de múltiplos produtos  

### Controle e integração
- Usuários não autenticados são redirecionados para a Home  
- Integração com CartContext para gerenciamento global do carrinho  
- Navegação utilizando react-router-dom  
- Tratamento e correção automática das URLs das imagens dos produtos  

O componente centraliza toda a gestão do carrinho, proporcionando uma experiência dinâmica e organizada para o usuário.

---

## <a name="login"></a>🔐 Página Login

A página Login autentica o usuário, permitindo acesso a funcionalidades protegidas da aplicação, como o carrinho de compras.

### Funcionalidades
- Login com email e senha  
- Validação das credenciais via API (/usuario/login)  
- Exibição de mensagens de erro em caso de falha na autenticação  

### Processo de autenticação
- Armazena token e dados do usuário no localStorage  
- Atualiza o estado global via CartContext para carregar o carrinho corretamente  
- Registra login recente no sessionStorage  
- Dispara o evento global userLoggedIn para atualizar componentes da interface, como o Header  

### Navegação
- Redireciona para a Home após login  
- Links para cadastro, recuperação de senha e retorno à página inicial  

### Segurança
- Isola os dados do carrinho por usuário, evitando compartilhamento indevido entre sessões  

A página é essencial para o controle de acesso e personalização da experiência do usuário na aplicação.

---

## <a name="banner"></a>🎯 Componente Banner

O Banner exibe uma seção de destaque na página inicial, apresentando a identidade visual da aplicação e incentivando a exploração dos produtos.

### Características
- Componente funcional simples, sem estados ou efeitos  
- Exibe a logo da aplicação, título principal e subtítulo  
- Estilizado via `Banner.css`  
- Utiliza `import.meta.env.BASE_URL` para carregar a imagem da logo  

Tem como objetivo tornar a interface inicial mais atrativa e acolhedora para o usuário.

---

## <a name="productlist"></a>📦 Componente ProductList

O ProductList é responsável por renderizar a lista de produtos da aplicação, recebendo os dados via props e utilizando o componente ProductCard para exibir cada item.

### Funcionalidades
- Validação do array de produtos recebido  
- Exibição de mensagem quando não houver produtos disponíveis  
- Renderização dinâmica dos produtos utilizando map  
- Integração com o componente ProductCard  
- Tratamento automático das URLs das imagens dos produtos  

#### Detalhes
- Corrige caminhos de imagens antigos ou locais, garantindo compatibilidade com o servidor de imagens da aplicação  
- Utiliza identificadores únicos (key) para otimizar a renderização dos itens no React  

O componente centraliza a exibição dos produtos, garantindo uma listagem dinâmica, organizada e compatível com os dados recebidos do backend.

---

## <a name="productcard"></a>🛍️ Componente ProductCard

O ProductCard exibe as informações de um produto e permite que o usuário selecione um tamanho, adicione o item ao carrinho ou realize a compra diretamente.

### Funcionalidades
- Exibição de imagem, nome, descrição e preço do produto  
- Seleção de tamanho por meio de um carrossel interativo  
- Validação da seleção de tamanho antes de adicionar ao carrinho ou comprar  
- Exibição de mensagens de erro quando nenhum tamanho é selecionado  

### Integração
- Utiliza o CartContext para adicionar produtos ao carrinho e verificar a autenticação do usuário  
- Redireciona usuários não autenticados para a página de login  
- Utiliza react-router-dom para navegação entre páginas  
- Tratamento automático das URLs das imagens dos produtos  

### Ações
- Adicionar produto ao carrinho com o tamanho selecionado  
- Compra imediata com redirecionamento para o checkout  

### Comportamentos adicionais
- Fecha a seleção ao clicar fora do componente  
- Reseta a seleção após adicionar ao carrinho ou finalizar a compra  
- Exibe imagem padrão em caso de falha no carregamento da imagem do produto  

O componente centraliza as principais interações de compra da aplicação, proporcionando uma experiência dinâmica e intuitiva para o usuário.

---

## <a name="cartcontext"></a>🛒 Contexto CartContext

O CartContext é responsável por gerenciar o estado global do carrinho e da sessão do usuário, compartilhando dados e funcionalidades entre todos os componentes da aplicação por meio da Context API.

### Funcionalidades
- Armazenamento e gerenciamento dos produtos adicionados ao carrinho  
- Controle da identificação do usuário autenticado  
- Persistência dos dados do carrinho no localStorage  
- Exibição de notificações ao adicionar produtos  
- Atualização e remoção de itens do carrinho  
- Limpeza completa do carrinho  

### Controle de usuário
- Mantém carrinhos separados para usuários autenticados e visitantes  
- Realiza a sincronização e mesclagem do carrinho de visitante após o login  
- Permite atualização da sessão do usuário e controle de logout  

### Integração
- Utiliza localStorage para persistência dos dados entre sessões  
- Disponibiliza estados e funções para toda a aplicação por meio do Context API  

O contexto centraliza toda a lógica de gerenciamento do carrinho e da sessão do usuário, garantindo persistência, organização e consistência dos dados durante a navegação na aplicação.

---

## <a name="cartmessage"></a>🔔 Componente CartMessage

O CartMessage exibe uma notificação temporária sempre que um produto é adicionado ao carrinho, fornecendo feedback visual imediato ao usuário.

### Funcionalidades
- Exibição de mensagem de confirmação com imagem, nome, tamanho e preço do produto  
- Fechamento automático da notificação após alguns segundos  
- Possibilidade de fechamento manual da mensagem  

### Integração
- Utiliza o CartContext para acessar e controlar o estado das notificações  
- Utiliza react-router-dom para navegação até a página do carrinho  

### Ações
- Fechar a notificação manualmente  
- Redirecionar o usuário para o carrinho através da opção "Ver carrinho"  

### Comportamentos adicionais
- Não é renderizado quando não existe nenhuma notificação ativa  
- Utiliza useEffect para controlar o tempo de exibição da mensagem  

O componente melhora a experiência do usuário ao fornecer uma confirmação visual rápida e intuitiva após a adição de produtos ao carrinho.

---

## <a name="checkout"></a>💳 Página Checkout

A página Checkout exibe os detalhes do produto selecionado e permite ao usuário configurar a compra antes da finalização.

### Funcionalidades
- Exibição da imagem, nome e preço do produto  
- Seleção de tamanho com destaque visual  
- Controle de quantidade de itens  
- Cálculo automático do valor total da compra  

### Finalização
- Valida a seleção do tamanho antes de permitir a finalização da compra  
- Redireciona para a página de finalização enviando os dados do produto selecionado  
- Utiliza o componente BtnFinalizarCompra para padronizar a ação de compra  

### Controle e integração
- Recebe os dados do produto por meio do react-router-dom  
- Mantém os dados da compra utilizando localStorage para evitar perda de informações durante a navegação  
- Realiza o tratamento automático das URLs das imagens dos produtos  
- Exibe mensagem quando não há produto selecionado  

A página prepara e valida os dados da compra, garantindo uma experiência organizada e segura antes da finalização do pedido.

---

## <a name="finalizarcompra"></a>🧾 Página FinalizarCompra

A página FinalizarCompra conclui o processo de compra, exibindo os produtos selecionados, coletando os dados do cliente e permitindo a escolha da forma de pagamento.

### Funcionalidades
- Exibição dos produtos com imagem, nome, tamanho, quantidade e valor total  
- Cálculo automático do total do pedido  
- Preenchimento automático dos dados do usuário autenticado  
- Consulta de CEP para preenchimento do endereço  
- Seleção entre as formas de pagamento Pix, Boleto e Cartão  
- Validação dos dados antes da finalização da compra  

### Integração
- Utiliza o CartContext para gerenciamento e atualização do carrinho  
- Consome a API para carregar os dados do usuário e processar a compra  
- Integra os componentes AbaPix, AbaCartao e BtnFinalizarCompra  
- Realiza o tratamento automático das URLs das imagens dos produtos  

### Controle e feedback
- Exibe mensagens temporárias de sucesso e erro durante o processo de pagamento  
- Remove do carrinho os produtos comprados após a confirmação da compra  
- Redireciona para a página de acompanhamento do pedido após a finalização  
- Exibe mensagem quando não há produtos selecionados para compra  

A página centraliza a etapa final do fluxo de compra, reunindo informações do pedido, dados do cliente e opções de pagamento para garantir uma finalização segura e organizada.

---

## <a name="btnfinalizarcompra"></a>🔘 Componente BtnFinalizarCompra

O BtnFinalizarCompra é um componente reutilizável utilizado para executar ações de finalização de compra em diferentes etapas da aplicação.

### Funcionalidades
- Exibição de texto personalizado por meio de propriedades  
- Execução de ações ao ser clicado  
- Suporte ao estado desabilitado para impedir interações quando necessário  

### Integração
- Pode ser utilizado em páginas como Carrinho, Checkout e FinalizarCompra  
- Estilizado por meio do arquivo `BtnFinalizarCompra.css`  

O componente padroniza os botões de finalização da aplicação, garantindo consistência visual, reutilização de código e melhor manutenção da interface.

---

## <a name="statuspedido"></a>📦 Página StatusPedido

A página StatusPedido exibe o progresso em tempo real do rastreamento de um pedido, além de listar recomendações de produtos para o usuário.

### Funcionalidades
- Linha do tempo interativa (*stepper*) com 5 etapas visuais de rastreamento do pedido
- Avanço simulado e automático do status do pedido baseado em tempo  
- Renderização de uma lista de recomendações utilizando o componente secundário `ProductList`  

### Integração com backend
- Consome a lista de produtos recomendados via requisição GET utilizando a API nativa `fetch`  
- Aponta diretamente para o ambiente de produção hospedado no Render: `https://runshoes-backend.onrender.com/api/products`  

### Rastreamento e Animação
- Estrutura baseada em etapas: Pedido Realizado, Pagamento Confirmado, Pedido Enviado, Em Trânsito e Entregue  
- Hook `useEffect` configura um intervalo que avança o status automaticamente a cada 10 segundos  
- Substituição automática dos ícones das etapas concluídas por um símbolo de checkmark (✔)  
- Gerenciamento e limpeza do temporizador (`clearInterval`) para prevenir vazamentos de memória (*memory leaks*)  

### Controle e navegação
- Estado interno controlado por `useState` para gerenciar o passo atual do rastreamento e os dados da API  
- Estilização dedicada via `StatusPedido.css` para demarcar os estados ativos e as linhas de conexão do *stepper* A página oferece uma experiência visual fluida e dinâmica para o acompanhamento logístico do pedido, aproveitando o espaço para impulsionar novas conversões com vitrines de recomendação.

---

## <a name="abapix"></a>💰 Componente AbaPix

O AbaPix exibe as opções de pagamento via Pix ou Boleto na finalização da compra, alternando o conteúdo conforme o tipo de pagamento selecionado.

### Funcionalidades
- Renderização condicional baseada na prop `tipo`:
  - "pix" → Exibe QR Code e chave Pix com opção de cópia  
  - "boleto" → Exibe imagem do boleto bancário  
- Permite copiar a chave Pix para a área de transferência  

### Personalização e uso
- Utiliza imagens locais para QR Code e boleto  
- Estilizado com `AbaPix.css`  
- Usado na página de finalização de compra, integrado ao sistema de seleção de pagamento  

Oferece uma interface simples e direta para métodos de pagamento alternativos, facilitando a escolha do usuário na etapa final da compra.

---

## <a name="abacartao"></a>💳 Componente AbaCartao

O AbaCartao exibe e gerencia o formulário de pagamento com cartão de crédito na finalização da compra.

### Funcionalidades
- Preenchimento de número do cartão (16 dígitos), validade (MM/AA) e CVV  
- Campos individuais para o número do cartão com navegação automática entre inputs  
- Máscara e controle de entrada apenas numérica  

### Validação, segurança e integração
- Número do cartão: 16 dígitos obrigatórios  
- Validade: mês entre 01-12 e ano não pode estar vencido  
- CVV: mínimo de 3 dígitos  
- Exibe mensagens de erro em caso de dados inválidos  
- Disponibiliza função global `validarCartao` para validação no momento da compra  
- Integra com API para carregar cartão salvo do usuário  
- Permite opção de salvar cartão para compras futuras  

### Interações inteligentes
- Avança automaticamente entre campos ao digitar  
- Retorna foco ao campo anterior ao apagar valores  
- Formata mês automaticamente (ex: 2 → 02)  
- Divide número do cartão em blocos para melhor visualização  
- Exibe dica interativa do CVV com `AnimacaoCartao`  

### Comportamentos adicionais
- Controla estado de salvamento do cartão  
- Sincroniza dados do cartão com `window` para uso no fluxo de pagamento  
- Remove dados globais ao desmontar o componente  

Oferece uma experiência segura, validada e interativa para pagamentos com cartão, garantindo precisão e usabilidade no processo de compra.

---

## <a name="animacaocartao"></a>🎴 Componente AnimacaoCartao

O AnimacaoCartao exibe uma animação visual de um cartão de crédito, destacando a localização do CVV.

### Funcionalidades
- Exibe frente e verso do cartão de crédito  
- Mostra chip na frente e tarja preta no verso  
- Destaca a área do CVV com animação visual  

### Animação
- Efeito de flip entre frente e verso do cartão  
- Realce animado na área do CVV para facilitar identificação  

### Uso e personalização
- Utilizado dentro do componente AbaCartao  
- Ativado ao clicar no ícone de ajuda do CVV  
- Estilizado via `AnimacaoCartao.css` e SVG para efeito visual  

Fornece orientação visual clara e melhora a experiência do usuário no preenchimento do CVV.

---

## <a name="cadastro"></a>📝 Página de Cadastro

A página Cadastro permite que novos usuários criem uma conta, preenchendo informações pessoais, login e endereço.

### Funcionalidades
- Formulário com nome, CPF, email, senha e confirmação de senha  
- Preenchimento e validação de endereço completo  
- Máscaras automáticas para CPF e CEP  
- Validação de campos obrigatórios antes do envio  
- Integração com API para cadastro de usuário  

### Integração com backend
- Carrega dados iniciais do usuário via `/usuario/dados-iniciais`  
- Envia registro de usuário via POST em `/usuario/register`  
- Utiliza axios e serviço `api` para comunicação com o backend  

### Endereço
- Consulta automática de CEP via ViaCEP  
- Preenchimento automático de rua, bairro, cidade e estado  
- Opção de marcar “S/N” para número do endereço  
- Campos de cidade e estado somente leitura  

### Validações e regras
- CPF e CEP formatados automaticamente  
- Email validado por tipo de input  
- Senha com confirmação obrigatória  
- Controle de número do endereço com opção de ausência (S/N)  
- Exibição de mensagens de erro em caso de falha  

### Controle e navegação
- Redireciona para login após cadastro bem-sucedido  
- Botão de retorno para página inicial  
- Exibe mensagens de erro quando necessário  

A página centraliza o processo de criação de conta, garantindo validação, integração com backend e preenchimento inteligente de endereço para melhorar a experiência do usuário.

---

## <a name="editarcadastro"></a>✏️ Página EditarCadastro

A página EditarCadastro permite que o usuário logado atualize seus dados pessoais, credenciais de login e endereço.

### Funcionalidades
- Formulário pré-preenchido com os dados atuais do usuário  
- Edição opcional de senha com campo de confirmação  
- Máscaras automáticas para os campos de CPF e CEP  
- Validação de campos obrigatórios antes do envio  
- Exibição de mensagens de sucesso ou erro  

### Integração com backend
- Recebe os dados iniciais via estado de navegação (`location.state.user`)  
- Envia os dados atualizados via requisição PUT para `/usuario/editar/:id`  
- Utiliza axios através do serviço `api` para comunicação  

### Endereço
- Consulta automática de CEP via API ViaCEP ao digitar ou sair do campo  
- Preenchimento automático de rua, bairro, cidade e estado  
- Opção de marcar "S/N" para número, desabilitando o campo de texto  
- Campos de cidade e estado configurados como somente leitura  

### Validações e regras
- Nome e email são campos obrigatórios  
- Nova senha deve conter no mínimo 8 caracteres (se preenchida)  
- Confirmação de senha deve ser idêntica à nova senha  
- CPF e CEP têm seus caracteres não numéricos limpos antes do envio  

### Controle e navegação
- Redireciona o usuário para a página de login 2 segundos após o sucesso  
- Botão "Voltar" para navegação direta para a página de login  

A página simplifica a manutenção da conta do usuário, unindo validações de segurança, preenchimento inteligente de endereço e feedback visual de sucesso ou erro.

---

## <a name="forgotpassword"></a>🔑 Página ForgotPassword

A página ForgotPassword permite que o usuário inicie o processo de recuperação de conta validando o seu email cadastrado.

### Funcionalidades
- Formulário simples para inserção do email de recuperação  
- Validação local para garantir que o campo não seja enviado vazio  
- Exibição dinâmica de mensagens de erro caso o email não seja encontrado  

### Integração com backend
- Envia o email via requisição POST para o endpoint `/usuario/verificar-email`  
- Utiliza a instância `api` para comunicação com o servidor  
- Captura os dados do usuário retornados pela API após a validação bem-sucedida  

### Validações e regras
- Validação obrigatória de preenchimento do campo de email antes do disparo da requisição  
- Tratamento de erro genérico ou específico caso o e-mail não conste na base de dados  

### Controle e navegação
- Redireciona para a página `/editar-cadastro` enviando os dados do usuário via estado (`location.state.user`) após a validação  
- Botão "Voltar" para navegação direta de retorno à tela de login  

A página oferece uma porta de entrada segura para a recuperação de credenciais, validando a existência da conta antes de liberar o fluxo de edição de dados.
---

## <a name="resetpassword"></a>🔐 Página ResetPassword

A página ResetPassword permite que o usuário crie uma nova credencial de acesso utilizando um token de recuperação enviado via URL.

### Funcionalidades
- Formulário para inserção da nova senha e confirmação  
- Validação local para garantir a correspondência entre os campos  
- Exibição de mensagens de feedback para sucesso ou falhas da API  

### Integração com backend
- Captura o parâmetro `token` diretamente da URL utilizando o hook `useParams`  
- Envia a nova senha via requisição POST para o endpoint `/reset-password/:token`  
- Utiliza a instância `api` para realizar a comunicação com o servidor  

### Validações e regras
- Verificação obrigatória de igualdade entre o campo de nova senha e confirmação antes do envio  
- Tratamento e exibição de mensagens de erro customizadas vindas do backend em caso de falha ou token expirado  

### Controle e navegação
- Redireciona o usuário automaticamente para a página de `/login` após 2 segundos em caso de sucesso  

A página conclui o fluxo de recuperação de conta de forma objetiva, garantindo que a nova senha seja validada e gravada com segurança no banco de dados.

---

## <a name="footer"></a>🎴 Componente Footer

O Footer disponibiliza o rodapé global da aplicação, agregando a identidade visual da marca, links rápidos para a navegação do site e pontos de contato da desenvolvedora.

### Funcionalidades
- Exibição de logo institucional integrado à marca nominativa "Run Shoes"
- Injeção dinâmica do ano vigente para a mensagem de direitos autorais (`© 2026`)
- Blocos de links internos em formato de botões acessíveis para redirecionamento
- Redirecionamento instantâneo para a página inicial ao clicar sobre a área da marca/logo

### Estrutura e Links
- **Seção Institucional:** Logotipo carregado dinamicamente a partir da variável de ambiente (`import.meta.env.BASE_URL`) e texto legal de direitos autorais
- **Seção Links:** Atalhos estruturados para as rotas `/` (Home), `/carrinho` (Carrinho) e `/login` (Login)
- **Seção Contato:** Links externos com ícones em formato SVG estilizados apontando para perfis no GitHub e LinkedIn

### Controle e navegação
- Utiliza o hook `useNavigate` da biblioteca `react-router-dom` para gerenciar a troca interna de rotas sem recarregamento de página
- Tags de links externos configuradas com `target="_blank"` e `rel="noopener noreferrer"` para garantir segurança em aberturas de novas guias
- Estilização unificada e isolada através do arquivo `Footer.css`

O componente fecha o layout do ecossistema Run Shoes, auxiliando a navegação fluida do usuário e exibindo a assinatura profissional da criadora do projeto.

---

<a name="secao-backend"></a>### Funcionalidades Backend

### Model

## <a name="model-product"></a>📦 Model Product

O model Product define a estrutura de dados e as regras de negócio para os produtos do e-commerce (como tênis e calçados) no ecossistema do backend.

### Funcionalidades
- Modelagem orientada a objetos para a entidade de produtos  
- Encapsulamento estrito de atributos utilizando propriedades privadas nativas do JavaScript (`#`)  
- Flexibilidade na criação do produto permitindo descrições opcionais  
- Método de serialização customizado para conversão limpa do objeto em formato JSON  

### Estrutura e Atributos
- **#name:** Nome do produto (obrigatório)  
- **#description:** Detalhes ou especificações do item (opcional, assume `null` por padrão)  
- **#price:** Valor comercial do produto  
- **#image:** Caminho do arquivo ou URL da imagem do produto  

### Validações e Regras
- Uso de campos privados (`#`) para impedir modificações diretas ou acessos externos indevidos de fora da classe  
- Implementação de métodos acessores (*getters*) para leitura controlada de cada propriedade  
- Implementação de métodos modificadores (*setters*) permitindo atualizações seguras dos valores dos atributos  

### Controle e Exportação
- Método nativo `toJSON()` sobrescrito para extrair e mapear os campos privados em um objeto literal legível para o Express/API  
- Exportação baseada no padrão CommonJS (`module.exports`) para compatibilidade e integração nos controllers  

O modelo assegura a consistência e a segurança dos dados dos produtos antes de serem processados pelas rotas da API ou gravados no banco de dados.

---

## <a name="model-usuario"></a>📦 Model Usuario

O model Usuario estrutura os dados e as regras de negócio associados aos clientes da aplicação, centralizando o encapsulamento de informações sensíveis e a segurança de credenciais.

### Funcionalidades
- Modelagem orientada a objetos para a entidade de usuários/clientes  
- Proteção estrita de dados através de atributos privados nativos do JavaScript (`#`)  
- Criptografia integrada de senhas utilizando a biblioteca `bcryptjs`  
- Método de serialização que remove a senha hash antes de expor os dados em JSON  

### Estrutura e Atributos
- **#id:** Identificador único do usuário no sistema  
- **#nome:** Nome completo do cliente  
- **#email:** Endereço eletrônico (utilizado para login e recuperação)  
- **#cpf:** Cadastro de Pessoas Físicas do usuário  
- **#senha:** Hash seguro da senha criptografada do usuário  
- **#endereco:** Objeto de endereço completo vinculado ao usuário (opcional, assume `null` por padrão)  

### Validações e Regras de Segurança
- **setSenha(senha):** Método assíncrono que intercepta a senha em texto puro e gera um hash com fator de custo (*salt*) igual a 10 antes do armazenamento  
- **validarSenha(senha):** Método assíncrono que compara de forma segura uma senha digitada com o hash encriptado gravado no objeto  
- Métodos acessores (*getters*) para leitura limpa das propriedades privadas  
- Método exclusivo `setEndereco(endereco)` para atualização controlada do endereço  

### Controle e Exportação
- Método `toJSON()` customizado para converter a entidade em um objeto convencional, omitindo intencionalmente a senha para evitar vazamento de dados sensíveis  
- Exportação no padrão CommonJS (`module.exports`) para consumo direto nos controllers e serviços de autenticação  

O modelo garante o cumprimento de boas práticas de segurança (OWASP), blindando o acesso direto a dados pessoais e assegurando o armazenamento criptográfico de credenciais.

---

### Controller

## <a name="controller-productcontroller"></a>🎮 Controller ProductController

O ProductController gerencia as requisições HTTP da API relacionadas aos produtos, atuando como intermediário entre as rotas de entrada e a camada de serviços (`ProductService`).

### Funcionalidades
- Listagem geral de produtos cadastrados  
- Criação e registro de novos produtos no catálogo  
- Atualização cadastral de dados de um produto existente  
- Remoção definitiva de um produto por meio de seu identificador  

### Integração com backend
- Interage diretamente com a camada `ProductService` para persistência e leitura de dados  
- Instancia objetos a partir do model `Product` para garantir a validação estrutural interna antes de operações de escrita  
- Compatível com comportamento do PostgreSQL (não depende de propriedades como `insertId` no retorno)  

### Métodos e Endpoints
- **index (GET):** Busca todos os produtos e os retorna formatados via mapeamento `toJSON()` (Status `200`)  
- **create (POST):** Recebe o corpo da requisição, valida campos e salva o novo produto (Status `201`)  
- **update (PUT):** Captura o ID via parâmetro de URL (`req.params`) e os novos dados no corpo para atualizar o produto (Status `200`)  
- **delete (DELETE):** Captura o ID via URL e remove o registro correspondente, retornando uma resposta sem conteúdo (Status `204`)  

### Validações e Regras
- Validação obrigatória de preenchimento para os campos `name`, `price` e `image` no método de criação, retornando erro de requisição inválida (Status `400`) caso falte algum  
- Isolamento de falhas internas com blocos `try/catch` em todos os métodos, registrando erros no console e emitindo respostas padronizadas de falha no servidor (Status `500`)  

### Controle e Exportação
- Exporta uma instância única da classe (`new ProductController()`) no padrão CommonJS para acoplamento direto no arquivo de rotas Express  

O controlador padroniza as respostas de API para o gerenciamento de produtos, aplicando códigos de status HTTP corretos e blindando a aplicação contra falhas não tratadas.

---

## <a name="controller-usuariocontroller"></a>🎮 Controller UsuarioController

O UsuarioController centraliza as regras de orquestração HTTP para gerenciamento de usuários, fluxos de autenticação (JWT), gerenciamento de cartões e finalização de compras.

### Funcionalidades
- Fluxo de autenticação completo (cadastro, login e validação de tokens)  
- Manutenção do perfil do usuário e geração de dados iniciais fictícios  
- Gerenciamento seguro de cartões de crédito vinculados à conta  
- Processamento e geração de protocolo para finalização de compras  

### Integração com backend
- Comunicação direta com a camada `UsuarioService` para execução da lógica de negócios e persistência  
- Emissão de tokens de autenticação utilizando a biblioteca `jsonwebtoken` (JWT)  
- Consumo de chaves secretas do ambiente (`process.env.JWT_SECRET`) com fallback de segurança  
- Serialização padronizada de objetos de resposta por meio do método `toJSON()` do model  

### Métodos e Endpoints
- **register (POST):** Cadastra novos usuários validando tamanho de senha e duplicidade de email (Status `201`)  
- **login (POST):** Autentica o usuário e retorna um token JWT com validade de 1 dia junto aos dados do perfil (Status `200`)  
- **verificarEmail (POST):** Verifica previamente se um endereço de email consta na base de dados (Status `200` ou `404`)  
- **dadosUsuario (GET):** Recupera os dados do perfil logado decodificando o token JWT enviado via cabeçalho `Authorization` (Status `200`)  
- **dadosIniciais (GET):** Retorna uma carga inicial de dados padrão para o frontend (Status `200`)  
- **editarUsuario (PUT):** Atualiza as informações cadastrais do usuário (incluindo CPF e endereço) filtrando por ID (Status `200`)  
- **obterCartao (GET):** Recupera os dados do cartão de crédito salvo ou gera um novo vinculado ao ID do JWT (Status `200`)  
- **salvarCartao (POST):** Armazena ou atualiza as informações de cartão de crédito do usuário logado (Status `200`)  
- **finalizarCompra (POST):** Processa a ordem de pagamento, salva opcionalmente o cartão no banco e gera um número de protocolo aleatório (Status `200`)  

### Validações e Regras
- Bloqueio de requisições com dados em falta ou senhas menores que 8 caracteres no registro (Status `400`)  
- Validação estrita do cabeçalho de autenticação Bearer Token nos endpoints protegidos, retornando erro para tokens ausentes, expirados ou inválidos (Status `401`)  
- Isolamento de erros assíncronos em blocos `try/catch` direcionando logs detalhados ao console do servidor  

### Controle e Exportação
- Exporta uma instância única da classe (`new UsuarioController()`) sob o padrão CommonJS para mapeamento direto no roteador Express  

O controlador funciona como o núcleo operacional de segurança e transações do e-commerce, protegendo dados sensíveis e padronizando os contratos de API com o frontend.

---

### Service

## <a name="service-productservice"></a>🛠️ Service ProductService

O ProductService é responsável pela lógica de persistência e manipulação direta dos dados de produtos no banco de dados PostgreSQL.

### Funcionalidades
- Criação e inserção de novos produtos no banco de dados  
- Listagem global de todos os itens do catálogo  
- Busca refinada de produtos por ID  
- Atualização completa dos campos de um produto  
- Remoção lógica ou física de um item pelo seu identificador  

### Integração com backend
- Utiliza o módulo pooling de conexão (`db`) configurado em `../database/connection`  
- Executa consultas SQL estruturadas utilizando parametrização segura (`$1`, `$2`, etc.) para prevenir ataques de SQL Injection  
- Instancia e mapeia os resultados brutos de consultas de leitura (SELECT) de volta em objetos válidos do model `Product`  

### Métodos e Operações de Banco
- **create(product):** Executa um comando `INSERT` contendo as propriedades do produto e utiliza a cláusula `RETURNING *` para obter o registro recém-criado  
- **findAll():** Executa um `SELECT *` na tabela de produtos e converte as linhas (*rows*) retornadas em um array de instâncias da classe `Product`  
- **findById(id):** Filtra um produto por ID, tratando cenários vazios ao retornar `null` caso nenhuma linha seja encontrada  
- **update(id, product):** Executa uma instrução `UPDATE` modificando todas as propriedades do item com base no ID e retorna o registro modificado  
- **delete(id):** Executa uma consulta `DELETE` filtrada por ID e devolve as informações do produto removido  

### Validações e Regras
- Métodos definidos como estáticos (`static`), permitindo chamadas diretas pelo controller sem a necessidade de instanciar a classe  
- Uso generalizado da cláusula `RETURNING *` nativa do PostgreSQL para otimizar o fluxo e evitar consultas adicionais de checagem  

### Controle e Exportação
- Exporta a classe pura `ProductService` no formato CommonJS para consumo desacoplado nas camadas superiores da aplicação  

O serviço isola a sintaxe e a comunicação SQL do restante da aplicação, assegurando que alterações na estrutura do banco de dados não quebrem a lógica dos controladores.

---

## <a name="service-usuarioservice"></a>🛠️ Service UsuarioService

O UsuarioService centraliza as regras de negócio complexas do sistema de usuários, abrangendo desde autenticação e criptografia até a geração de dados simulados (*mock*) para testes e preenchimento ágil.

### Funcionalidades
- Gerenciamento de persistência para as tabelas `users`, `enderecos` e `cartoes`  
- Autenticação de login com verificação criptográfica de senhas  
- Lógica de atualização dinâmica e parcial de dados do perfil  
- Geração automática de CPFs, cartões de crédito e endereços brasileiros válidos  

### Integração com backend
- Utiliza o pool de conexão do PostgreSQL (`db`) para realizar transações estruturadas  
- Aplica hash seguro em novas senhas utilizando a biblioteca `bcryptjs`  
- Converte os retornos do banco em instâncias tipadas utilizando o model `Usuario`  

### Métodos e Lógica de Negócio
- **gerarDadosIniciais / gerarDadosMock:** Fornecem objetos estruturados contendo dados simulados para acelerar os formulários do frontend.
- **cadastrarUsuario:** Cria o usuário de forma atômica no banco, gera hashes seguros, atribui dados complementares se omitidos e vincula um registro na tabela de endereços.
- **logarUsuario:** Realiza a busca pelo email e valida a senha enviada por meio do método interno do model, retornando a instância completa do usuário.
- **buscarPorEmail / buscarPorId:** Realizam consultas agregadas (SELECT) unificando dados cadastrais e de endereço do cliente.
- **atualizarUsuario:** Monta queries SQL dinamicamente baseando-se apenas nos campos enviados (evitando sobrescritas parciais) e executa o `UPDATE` ou `INSERT` na tabela de endereços de forma condicional.
- **obterOuGerarCartao:** Verifica a existência de um cartão salvo; caso não encontre, gera dados de teste plausíveis (Número, Mês, Ano e CVV).
- **salvarCartao:** Limpa caracteres não numéricos do cartão e gerencia a inserção ou atualização dos dados financeiros do usuário.

### Controle e Exportação
- Exporta diretamente a classe `UsuarioService` com métodos estáticos (`static`) no padrão CommonJS para consumo desacoplado pelas camadas de controle.

O serviço funciona como o motor de regras da aplicação de usuários, isolando a complexidade das consultas SQL relacionais e encapsulando as políticas de segurança da plataforma.

---

### Rotas

## <a name="rotas-produtos"></a>🛣️ Rotas de Produtos

O arquivo de rotas de produtos define os pontos de entrada (endpoints) da API para o gerenciamento do catálogo, mapeando as requisições HTTP para as ações do `ProductController`.

### Funcionalidades
- Mapeamento das operações de CRUD (Criação, Leitura, Atualização e Deleção) de produtos  
- Encapsulamento das rotas utilizando o roteador nativo do Express  

### Integração com backend
- Importa o módulo `express` para gerenciar o roteamento  
- Consome diretamente os métodos assíncronos da instância do `ProductController`  
- Atua como a primeira camada de recebimento de requisições do ciclo de vida HTTP do produto  

### Endpoints Definidos
- **GET `/` :** Lista todos os produtos cadastrados (chama `ProductController.index`)  
- **POST `/` :** Cadastra um novo produto no catálogo (chama `ProductController.create`)  
- **PUT `/:id` :** Atualiza os dados de um produto específico baseado no ID da URL (chama `ProductController.update`)  
- **DELETE `/:id` :** Remove um produto do sistema utilizando o ID da URL (chama `ProductController.delete`)  

### Validações e Regras
- Passagem explícita dos objetos `req` (requisição) e `res` (resposta) para as funções do controlador via funções anônimas, garantindo a manutenção do escopo de execução  

### Controle e Exportação
- Exporta a instância de `router` utilizando o padrão CommonJS (`module.exports`) para ser acoplada ao arquivo principal do servidor (`server.js` ou `app.js`)  

Este arquivo organiza a exposição do catálogo de produtos para o frontend, mantendo a arquitetura RESTful com caminhos limpos e semânticos.

---

## <a name="rotas-usuarios"></a>🛣️ Rotas de Usuários

O arquivo de rotas de usuários estabelece os pontos de entrada (endpoints) da API para autenticação, gerenciamento de perfis cadastrais e operações transacionais de checkout.

### Funcionalidades
- Mapeamento de fluxos de acesso (Registro, Login e Recuperação de conta)  
- Disponibilização de endpoints para consulta e edição de dados do perfil  
- Controle de endpoints vinculados à gestão de cartões e fechamento de pedidos  

### Integração com backend
- Utiliza o submódulo `Router` nativo do Express para modularizar as rotas do sistema  
- Direciona o fluxo de dados recebido para os respectivos métodos da instância global do `UsuarioController`  

### Endpoints Definidos
- **POST `/register` :** Cria uma nova conta de usuário no sistema (chama `UsuarioController.register`)  
- **POST `/login` :** Autentica o cliente e gera o token de acesso (chama `UsuarioController.login`)  
- **POST `/verificar-email` :** Valida a existência de um e-mail antes de fluxos críticos (chama `UsuarioController.verificarEmail`)  
- **PUT `/editar/:id` :** Modifica as informações cadastrais do usuário via ID da URL (chama `UsuarioController.editarUsuario`)  
- **GET `/dados-iniciais` :** Carrega dados simulados predefinidos para novos formulários (chama `UsuarioController.dadosIniciais`)  
- **GET `/dados-usuario` :** Recupera as informações protegidas do perfil logado (chama `UsuarioController.dadosUsuario`)  
- **GET `/cartao` :** Retorna o cartão associado ou gera dados de teste (chama `UsuarioController.obterCartao`)  
- **POST `/cartao` :** Registra ou substitui as informações financeiras de um cartão salvo (chama `UsuarioController.salvarCartao`)  
- **POST `/finalizar-compra` :** Processa o pagamento do carrinho e emite um protocolo (chama `UsuarioController.finalizarCompra`)  

### Validações e Regras
- Passagem explícita dos parâmetros `req` e `res` via funções de retorno (*callbacks*), mantendo o isolamento de escopo e o tratamento assíncrono interno nos controladores  

### Controle e Exportação
- Exporta o módulo roteador (`router`) no padrão CommonJS para ser acoplado e servido pelo arquivo central do servidor Express  

Este arquivo consolida a porta de entrada para toda a inteligência de negócios de clientes na aplicação, organizando os caminhos lógicos consumidos pelo cliente HTTP do frontend.

---

## <a name="middleware-auth"></a>🛡️ Middleware authMiddleware

O authMiddleware atua como uma camada de segurança intermediária (filtro) que intercepta as requisições HTTP para validar os tokens de autenticação antes de liberar o acesso a rotas privadas.

### Funcionalidades
- Interceptação de requisições enviadas para rotas protegidas  
- Extração de credenciais de acesso diretamente dos cabeçalhos HTTP  
- Bloqueio imediato de acessos anônimos ou maliciosos  

### Integração com backend
- Utiliza a biblioteca `jsonwebtoken` para decodificar e validar a assinatura dos tokens  
- Baseia-se na chave simétrica `JWT_SECRET` ("SEGREDO_SUPER_SEGURO") para a checagem de integridade  
- Injeta os dados decodificados no objeto de requisição (`req.user`), disponibilizando o ID e o email do usuário para as funções seguintes  

### Validações e Regras
- **Verificação de Presença:** Avalia se o cabeçalho `Authorization` foi enviado, respondendo com Status `401` ("Token não fornecido") caso esteja ausente  
- **Extração Semântica:** Divide a string do cabeçalho para isolar o token do prefixo padrão (padrão *Bearer Token*)  
- **Validação de Assinatura:** Executa o método `jwt.verify` em um bloco `try/catch`; se o token estiver expirado, corrompido ou adulterado, a requisição é abortada com Status `401` ("Token inválido")  

### Controle e Fluxo
- Invoca a função `next()` após a validação bem-sucedida, transferindo o controle da requisição para o próximo middleware ou controlador mapeado na rota  
- Exporta a função pura `authMiddleware` no formato CommonJS para aplicação direta como interceptor nas rotas do Express  

O middleware garante o isolamento e a proteção das informações da API, certificando que apenas usuários autenticados consigam interagir com recursos sensíveis do sistema.

---

## <a name="pool-banco"></a>🗄️ Conexão com o Banco de Dados (Pool)

O arquivo de conexão configura e estabelece o gerenciamento de conexões com o banco de dados relacional MySQL, servindo como a fundação de persistência para toda a API.

#### Funcionalidades
* **Gerenciamento Otimizado:** Criação e gerenciamento centralizado de um pool de conexões assíncronas.
* **Segurança:** Carregamento seguro de credenciais via variáveis de ambiente.
* **Flexibilidade de Porta:** Suporte à porta customizada ou fallback automático para o padrão de mercado.

#### Integração com o Backend
* Utiliza o método `createPool` do módulo `mysql2/promise` para otimizar o reuso de conexões abertas através de Promises (`async/await`), evitando sobrecarga no servidor e melhorando a performance das queries.
* Integra a biblioteca `dotenv` para injetar os dados sensíveis do arquivo `.env` diretamente em `process.env`.

#### Estrutura e Variáveis de Ambiente
O driver de conexão inicializa o pool mapeando os seguintes parâmetros:
* **`host`:** Endereço do servidor do banco de dados (`process.env.DB_HOST`).
* **`user`:** Usuário de autenticação do MySQL (`process.env.DB_USER`).
* **`password`:** Senha do usuário do banco de dados (`process.env.DB_PASSWORD`).
* **`database`:** Nome da base de dados do projeto, configurada como `lojavirtual` (`process.env.DB_NAME`).
* **`port`:** Porta de comunicação (utiliza `process.env.DB_PORT` ou assume o padrão **3306** do MySQL).

#### Validações e Regras de Infraestrutura
* **Compatibilidade Local e Web:** Configuração ideal para rodar tanto em ambientes de desenvolvimento local (como XAMPP e phpMyAdmin) quanto em servidores de produção dedicados.
* **Abstração de Promessas:** Ao utilizar a API baseada em Promises do `mysql2`, a aplicação ganha consistência na sintaxe, permitindo um tratamento de erros nativo e limpo com blocos `try/catch`.

#### Controle e Exportação
Exporta a instância ativa do objeto `pool` no formato CommonJS (`module.exports`), permitindo a execução simplificada de queries em toda a camada de serviços da aplicação. 

> ⚠️ **Nota de Segurança:** Esta configuração blinda as credenciais do banco para que não fiquem expostas no código-fonte, garantindo escalabilidade no tráfego de requisições.

---

## <a name="config-app"></a>🌐 Configuração do Aplicativo (App)

O arquivo de configuração do aplicativo inicializa o framework Express, aplica os middlewares globais de segurança e tráfego, expõe arquivos estáticos e centraliza o roteamento principal da API.

### Funcionalidades
- Instanciação e inicialização do servidor Express  
- Configuração de políticas restritas de CORS (Cross-Origin Resource Sharing)  
- Habilitação de parsing nativo para requisições com corpo em formato JSON  
- Rota de checagem básica (*healthcheck*) para monitoramento do status da API  
- Exposição pública e estática de arquivos de imagem do catálogo  

### Integração com backend
- Atua como o ponto de convergência onde os módulos de rotas `productRoutes` e `usuarioRoutes` são acoplados globalmente  
- Utiliza o módulo nativo `path` para a resolução segura de caminhos de arquivos no sistema operacional  

### Middlewares e Políticas de Acesso
- **CORS Control:** Configura permissões explícitas para as origens de produção no GitHub Pages (`marianarodriguess3.github.io`) e para o ambiente de desenvolvimento local (`localhost:5173`).  
- **Métodos Permitidos:** Restringe o tráfego da API estritamente aos métodos HTTP semânticos: `GET`, `POST`, `PUT` e `DELETE`.  
- **Private Network:** Injeta manualmente o cabeçalho `Access-Control-Allow-Private-Network` para dar suporte a requisições originadas em redes privadas locais ou contêineres específicos.  

### Endpoints e Recursos Estáticos
- **GET `/api/test` :** Rota de teste rápido para validar o funcionamento do servidor (Status `200`).  
- **Static `/images` :** Disponibiliza o acesso direto via URL às imagens físicas dos tênis armazenadas no diretório público (`public/images`).  
- **Prefixos `/api/products` e `/api/usuario` :** Direcionam o fluxo das requisições para seus respectivos ecossistemas de roteamento.  

### Controle e Exportação
- Exporta o objeto inicializado `app` no formato CommonJS para ser acoplado ao arquivo de escuta de portas (`server.js` ou `index.js`), permitindo o isolamento da lógica do servidor para fins de testes automatizados.  

Este arquivo estabelece as regras de tráfego de rede e segurança da API, garantindo que o frontend consiga consumir recursos, imagens e endpoints transacionais de forma transparente e blindada.

---

## <a name="init-server"></a>🚀 Inicialização do Servidor (Server)

O arquivo de inicialização é o ponto de entrada principal (*entry point*) do backend. Ele é responsável por colocar o servidor Express em execução e disparar a conexão assíncrona com o banco de dados.

### Funcionalidades
- Inicialização e escuta da porta de rede para o servidor HTTP  
- Gerenciamento do fluxo de inicialização otimizado para plataformas em nuvem  
- Ativação da conexão com o banco de dados PostgreSQL em segundo plano  

### Integração com backend
- Importa o aplicativo Express totalmente configurado (`app`)  
- Consome a instância de conexão do banco de dados (`db`) para validar o acesso à persistência  
- Utiliza variáveis de ambiente injetadas pelo ecossistema do servidor para definição de portas  

### Configurações de Porta e Variáveis
- **process.env.PORT:** Captura dinamicamente a porta designada pelo ambiente de produção do **Render** - **Fallback Local:** Assume automaticamente a porta `5000` caso nenhuma variável de ambiente seja detectada (desenvolvimento local)  

### Validações e Regras de Inicialização
- **Prioridade de Inicialização:** O método `app.listen` é disparado imediatamente no início do script. Essa ordem é crucial para que o **Render** valide o *healthcheck* de deploy e evite timeouts de inicialização.  
- **Conexão Assíncrona:** A conexão com o banco (`db.connect`) roda em paralelo por meio de Promises (`.then` / `.catch`), garantindo que falhas momentâneas na rede do banco de dados não causem o travamento completo do carregamento inicial do servidor.  

### Controle e Execução
- Centraliza os logs de diagnóstico iniciais (`console.log`) informando o sucesso da execução do servidor e do banco, ou exibindo detalhes estruturados de erros em caso de falha de conexão.  

Este arquivo consolida a orquestração de boot do ecossistema, unindo a infraestrutura de rede do Express com a camada de persistência para disponibilizar a API em produção.


