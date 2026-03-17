const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// 🔥 Lista de endereços famosos
const enderecosFamosos = [
  { cep: "01001-000", rua: "Praça da Sé", numero: "100", bairro: "Sé", cidade: "São Paulo", estado: "SP" },
  { cep: "20040-020", rua: "Rua do Ouvidor", numero: "200", bairro: "Centro", cidade: "Rio de Janeiro", estado: "RJ" },
  { cep: "30190-100", rua: "Avenida Afonso Pena", numero: "300", bairro: "Centro", cidade: "Belo Horizonte", estado: "MG" },
  { cep: "40020-000", rua: "Avenida Sete de Setembro", numero: "400", bairro: "Centro", cidade: "Salvador", estado: "BA" },
  { cep: "80020-310", rua: "Rua XV de Novembro", numero: "500", bairro: "Centro", cidade: "Curitiba", estado: "PR" },
];

// 🔥 Gera um CPF aleatório (somente números)
function gerarCPF() {
  return String(Math.floor(Math.random() * 99999999999)).padStart(11, '0');
}

// 🔥 Gera endereço aleatório
function gerarEnderecoMock() {
  const idx = Math.floor(Math.random() * enderecosFamosos.length);
  return enderecosFamosos[idx];
}

class UsuarioService {

  // 🔥 Dados iniciais para cadastro novo
  static gerarDadosIniciais() {
    return {
      nome: "",
      email: "",
      cpf: gerarCPF(),
      endereco: gerarEnderecoMock()
    };
  }

  // 🔥 Dados mock quando verificar email de edição e usuário não existe
  static gerarDadosMock(email) {
    return {
      nome: "",
      email,
      cpf: gerarCPF(),
      endereco: gerarEnderecoMock()
    };
  }

  // Cadastrar usuário
  static async cadastrarUsuario(nome, email, senha, cpf = null, endereco = null) {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) throw new Error("Email já cadastrado");

    const hashedPassword = await bcrypt.hash(senha, 10);
    const cpfFinal = cpf || gerarCPF();

    const [result] = await db.query(
      "INSERT INTO users (nome, email, cpf, password) VALUES (?, ?, ?, ?)",
      [nome, email, cpfFinal, hashedPassword]
    );

    const enderecoFinal = endereco || gerarEnderecoMock();

    await db.query(
      `INSERT INTO enderecos 
      (usuario_id, cep, rua, numero, bairro, cidade, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        result.insertId,
        enderecoFinal.cep,
        enderecoFinal.rua,
        enderecoFinal.numero,
        enderecoFinal.bairro,
        enderecoFinal.cidade,
        enderecoFinal.estado
      ]
    );

    return new Usuario(
      result.insertId,
      nome,
      email,
      cpfFinal,
      hashedPassword,
      enderecoFinal
    );
  }

  // Login
  static async logarUsuario(email, senha) {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) throw new Error("Usuário não encontrado");

    const userData = users[0];
    const [enderecos] = await db.query("SELECT * FROM enderecos WHERE usuario_id = ?", [userData.id]);

    const usuario = new Usuario(
      userData.id,
      userData.nome,
      userData.email,
      userData.cpf,
      userData.password,
      enderecos[0] || null
    );

    const senhaValida = await usuario.validarSenha(senha);
    if (!senhaValida) throw new Error("Senha inválida");

    return usuario;
  }

  // Buscar por email
  static async buscarPorEmail(email) {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return null;

    const userData = users[0];
    const [enderecos] = await db.query("SELECT * FROM enderecos WHERE usuario_id = ?", [userData.id]);

    return new Usuario(
      userData.id,
      userData.nome,
      userData.email,
      userData.cpf,
      userData.password,
      enderecos[0] || null
    );
  }

  // Buscar por ID
  static async buscarPorId(id) {
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (users.length === 0) return null;

    const userData = users[0];
    const [enderecos] = await db.query("SELECT * FROM enderecos WHERE usuario_id = ?", [id]);

    return new Usuario(
      userData.id,
      userData.nome,
      userData.email,
      userData.cpf,
      userData.password,
      enderecos[0] || null
    );
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

    return this.buscarPorId(id);
  }
}

module.exports = UsuarioService;