const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

class UsuarioService {
  static async cadastrarUsuario(nome, email, senha) {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) throw new Error("Email já cadastrado");

    const hashedPassword = await bcrypt.hash(senha, 10);
    const [result] = await db.query(
      "INSERT INTO users (nome, email, password) VALUES (?, ?, ?)",
      [nome, email, hashedPassword]
    );

    return new Usuario(result.insertId, nome, email, hashedPassword);
  }

  static async logarUsuario(email, senha) {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) throw new Error("Usuário não encontrado");

    const userData = users[0];
    const usuario = new Usuario(userData.id, userData.nome, userData.email, userData.password);

    const senhaValida = await usuario.validarSenha(senha);
    if (!senhaValida) throw new Error("Senha inválida");

    return usuario;
  }
}

module.exports = UsuarioService;