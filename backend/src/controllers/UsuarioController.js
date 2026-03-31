const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "SEGREDO_SUPER_SEGURO";

class UsuarioController {

  // Registro de novo usuário
  async register(req, res) {
    try {
      const { nome, email, password, cpf, endereco } = req.body;

      if (!nome || !email || !password) {
        return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres" });
      }

      const usuarioExistente = await UsuarioService.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const usuario = await UsuarioService.cadastrarUsuario(
        nome, email, password, cpf, endereco
      );

      return res.status(201).json(usuario.toJSON());

    } catch (err) {
      console.error("Erro no registro:", err);
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

  // Gerar dados aleatórios para o formulário (ex: CPF, Endereço mock)
  async dadosIniciais(req, res) {
    try {
      const dados = await UsuarioService.gerarDadosIniciais();
      res.json({ user: dados });
    } catch (err) {
      console.error("Erro ao gerar dados iniciais:", err);
      res.status(500).json({ message: "Erro ao gerar dados iniciais" });
    }
  }

  // Editar perfil do usuário
  async editarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, password, endereco } = req.body;

      if (!nome || !email) return res.status(400).json({ message: "Nome e email são obrigatórios" });

      const usuario = await UsuarioService.buscarPorId(id);
      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

      const usuarioAtualizado = await UsuarioService.atualizarUsuario(
        id, nome, email, password, endereco
      );

      res.json(usuarioAtualizado.toJSON());

    } catch (err) {
      console.error("Erro ao editar usuário:", err);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }

  // 🔥 OBTER CARTÃO (Busca no banco ou gera um visual para o frontend)
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

  // 🔥 SALVAR CARTÃO (Direto do painel de configurações ou checkout)
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

  // 🔥 FINALIZAR COMPRA
  async finalizarCompra(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const { cartao, salvarCartaoNoBanco } = req.body;

      // Log para conferência no terminal
      console.log("Processando compra para Usuario ID:", decoded.id);

      // Se o usuário marcou o checkbox no Frontend
      if (salvarCartaoNoBanco && cartao) {
        console.log("Checkbox 'salvar' marcado. Persistindo no banco...");
        await UsuarioService.salvarCartao(decoded.id, cartao);
      }

      // Aqui você poderia integrar com Stripe/PagSeguro futuramente
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