const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "SEGREDO_SUPER_SEGURO";

class UsuarioController {

  // Registro
  async register(req, res) {
    try {
      const { nome, email, password, cpf, endereco } = req.body;

      if (!nome || !email || !password) {
        return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres" });
      }

      // Nova regra: email duplicado
      const usuarioExistente = await UsuarioService.buscarPorEmail(email);
      if (usuarioExistente) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const usuario = await UsuarioService.cadastrarUsuario(
        nome, email, password, cpf, endereco
      );

      return res.status(201).json(usuario.toJSON());

    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
  }

  // Login
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
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Verificar email (esqueci senha)
  async verificarEmail(req, res) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Informe o email" });

      const usuario = await UsuarioService.buscarPorEmail(email);
      if (!usuario) return res.status(404).json({ message: "Email não cadastrado" });

      return res.status(200).json({ user: usuario.toJSON() });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  // Endpoint para retornar dados do usuário logado
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
      console.error(err);
      res.status(401).json({ message: "Token inválido" });
    }
  }

  // Dados iniciais para cadastro novo
  async dadosIniciais(req, res) {
    try {
      const dados = await UsuarioService.gerarDadosIniciais();
      res.json({ user: dados });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao gerar dados iniciais" });
    }
  }

  // Atualizar usuário
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
      console.error(err);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
}

module.exports = new UsuarioController();