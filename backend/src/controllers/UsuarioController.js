const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "SEGREDO_SUPER_SEGURO";

class UsuarioController {
  // Registro de usuário
  async register(req, res) {
    try {
      const { nome, email, password, confirmPassword } = req.body;

      if (!nome || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "As senhas não coincidem" });
      }

      if (password.length < 8) {
        return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email inválido" });
      }

      const usuario = await UsuarioService.cadastrarUsuario(nome, email, password);
      res.status(201).json(usuario.toJSON());
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Login de usuário
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }

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

  // Verifica se o email existe no banco
  async verificarEmail(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Informe o email" });
      }

      const usuario = await UsuarioService.buscarPorEmail(email);

      if (!usuario) {
        return res.status(404).json({ message: "Email não cadastrado" });
      }

      res.json({ user: usuario.toJSON() });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }

  // Atualiza cadastro do usuário
  async editarUsuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, password } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ message: "Nome e email são obrigatórios" });
      }

      const usuario = await UsuarioService.buscarPorId(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (password && password.length < 8) {
        return res.status(400).json({ message: "A senha deve ter no mínimo 8 caracteres" });
      }

      const usuarioAtualizado = await UsuarioService.atualizarUsuario(id, nome, email, password);

      res.json(usuarioAtualizado.toJSON());
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
}

module.exports = new UsuarioController();