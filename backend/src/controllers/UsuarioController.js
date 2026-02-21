const UsuarioService = require('../services/UsuarioService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "SEGREDO_SUPER_SEGURO";

class UsuarioController {
  async register(req, res) {
    try {
      const { nome, email, password, confirmPassword } = req.body;

      if (!nome || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Preencha todos os campos" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "As senhas não coincidem" });
      }

      const usuario = await UsuarioService.cadastrarUsuario(nome, email, password);
      res.status(201).json(usuario.toJSON());
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const usuario = await UsuarioService.logarUsuario(email, password);

      const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: "1d" });

      res.json({ token, user: usuario.toJSON() });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new UsuarioController();