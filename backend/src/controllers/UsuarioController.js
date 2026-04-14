const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "SEGREDO_SUPER_SEGURO";

class UsuarioController {

  // Registro de novo usuário
  async register(req, res) {
    try {
      // 1. MAPEAMENTO: Pega 'password' do body e chama de 'senha'
      const { nome, email, password: senha, cpf, endereco } = req.body;

      // 2. VALIDAÇÃO: Verifica se 'senha' (que era o password) existe
      if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
      }

      if (senha.length < 8) {
        return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres" });
      }

      const usuarioExistente = await UsuarioService.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      // 3. EXECUÇÃO: Passa 'senha' para o Service
      const usuario = await UsuarioService.cadastrarUsuario(
        nome, email, senha, cpf, endereco
      );

      return res.status(201).json(usuario.toJSON());

    } catch (err) {
      console.error("Erro no registro:", err);
      // Retornamos 400 se for erro de regra de negócio ou 500 se for erro de sintaxe/banco
      return res.status(400).json({ message: err.message });
    }
  }

  // Login do usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: "Preencha todos os campos" });

      const usuario = await UsuarioService.logarUsuario(email, password);

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token, user: usuario.toJSON() });

    } catch (err) {
      console.error("Erro no login:", err);
      res.status(400).json({ message: err.message });
    }
  }

  // Verificar se email existe
  async verificarEmail(req, res) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Informe o email" });

      const usuario = await UsuarioService.buscarPorEmail(email);
      if (!usuario) return res.status(404).json({ message: "Email não cadastrado" });

      return res.status(200).json({ user: usuario.toJSON() });

    } catch (err) {
      console.error("Erro ao verificar email:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  // Obter dados do perfil logado
  async dadosUsuario(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const usuario = await UsuarioService.buscarPorId(decoded.id);
      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

      res.status(200).json({ user: usuario.toJSON() });

    } catch (err) {
      console.error("Erro ao buscar dados do usuário:", err);
      res.status(401).json({ message: "Token inválido ou expirado" });
    }
  }

  // Gerar dados iniciais
  async dadosIniciais(req, res) {
    try {
      const dados = await UsuarioService.gerarDadosIniciais();
      res.json({ user: dados });
    } catch (err) {
      console.error("Erro ao gerar dados iniciais:", err);
      res.status(500).json({ message: "Erro ao gerar dados iniciais" });
    }
  }

  // 🔥 CORRIGIDO AQUI
  async editarUsuario(req, res) {
    try {
      const { id } = req.params;

      // ✅ AGORA PEGANDO CPF
      const { nome, email, password, cpf, endereco } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ message: "Nome e email são obrigatórios" });
      }

      const usuario = await UsuarioService.buscarPorId(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // ✅ AGORA ENVIANDO CPF
      const usuarioAtualizado = await UsuarioService.atualizarUsuario(
        id, nome, email, password, cpf, endereco
      );

      res.json(usuarioAtualizado.toJSON());

    } catch (err) {
      console.error("Erro ao editar usuário:", err);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }

  // Obter cartão
  async obterCartao(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const cartao = await UsuarioService.obterOuGerarCartao(decoded.id);
      res.json(cartao);

    } catch (err) {
      console.error("Erro ao obter cartão:", err);
      res.status(500).json({ message: "Erro ao obter cartão" });
    }
  }

  // Salvar cartão
  async salvarCartao(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const { cartao } = req.body;
      if (!cartao) return res.status(400).json({ message: "Dados do cartão não fornecidos" });

      await UsuarioService.salvarCartao(decoded.id, cartao);
      res.status(200).json({ sucesso: true, message: "Cartão salvo com sucesso!" });

    } catch (err) {
      console.error("Erro ao salvar cartão:", err);
      res.status(500).json({ message: "Erro ao salvar cartão" });
    }
  }

  // Finalizar compra
  async finalizarCompra(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const { cartao, salvarCartaoNoBanco } = req.body;

      console.log("Processando compra para Usuario ID:", decoded.id);

      if (salvarCartaoNoBanco && cartao) {
        console.log("Salvando cartão no banco...");
        await UsuarioService.salvarCartao(decoded.id, cartao);
      }

      res.json({
        sucesso: true,
        message: "Compra finalizada com sucesso!",
        protocolo: Math.floor(Math.random() * 1000000)
      });

    } catch (err) {
      console.error("Erro no Controller finalizarCompra:", err);
      res.status(500).json({ message: "Erro interno ao finalizar a compra" });
    }
  }
}

module.exports = new UsuarioController();