const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

class UsuarioService {
  // Cadastrar novo usuário
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

  // Logar usuário
  static async logarUsuario(email, senha) {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) throw new Error("Usuário não encontrado");

    const userData = users[0];
    const usuario = new Usuario(userData.id, userData.nome, userData.email, userData.password);

    const senhaValida = await usuario.validarSenha(senha);
    if (!senhaValida) throw new Error("Senha inválida");

    return usuario;
  }

  // Buscar usuário pelo email
  static async buscarPorEmail(email) {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return null;

    const userData = users[0];
    return new Usuario(userData.id, userData.nome, userData.email, userData.password);
  }

  // Buscar usuário pelo ID
  static async buscarPorId(id) {
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (users.length === 0) return null;

    const userData = users[0];
    return new Usuario(userData.id, userData.nome, userData.email, userData.password);
  }

  // Atualizar usuário
  static async atualizarUsuario(id, nome, email, password) {
    let query, params;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = "UPDATE users SET nome = ?, email = ?, password = ? WHERE id = ?";
      params = [nome, email, hashedPassword, id];
    } else {
      query = "UPDATE users SET nome = ?, email = ? WHERE id = ?";
      params = [nome, email, id];
    }

    await db.query(query, params);

    // Retorna o usuário atualizado
    return this.buscarPorId(id);
  }
}

module.exports = UsuarioService;