const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// --- FUNÇÕES AUXILIARES (Geração de dados mock) ---
const enderecosFamosos = [
  { cep: "01001-000", rua: "Praça da Sé", numero: "100", bairro: "Sé", cidade: "São Paulo", estado: "SP" },
  { cep: "20040-020", rua: "Rua do Ouvidor", numero: "200", bairro: "Centro", cidade: "Rio de Janeiro", estado: "RJ" },
  { cep: "30190-100", rua: "Avenida Afonso Pena", numero: "300", bairro: "Centro", cidade: "Belo Horizonte", estado: "MG" },
  { cep: "40020-000", rua: "Avenida Sete de Setembro", numero: "400", bairro: "Centro", cidade: "Salvador", estado: "BA" },
  { cep: "80020-310", rua: "Rua XV de Novembro", numero: "500", bairro: "Centro", cidade: "Curitiba", estado: "PR" },
];

function gerarCPF() {
  return String(Math.floor(Math.random() * 99999999999)).padStart(11, '0');
}

function gerarEnderecoMock() {
  const idx = Math.floor(Math.random() * enderecosFamosos.length);
  return enderecosFamosos[idx];
}

function gerarNumeroCartao() {
  let numero = "";
  for (let i = 0; i < 16; i++) {
    numero += Math.floor(Math.random() * 10);
  }
  return numero;
}

function gerarDadosExtrasCartao() {
  const mes = (Math.floor(Math.random() * 12) + 1).toString().padStart(2, "0");
  const ano = (Math.floor(Math.random() * 5) + 26).toString(); // ex: 26 = 2026
  const cvv = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return { mes, ano, cvv };
}

// --- CLASSE DE SERVIÇO ---
class UsuarioService {

  // Dados iniciais para formulário
  static gerarDadosIniciais() {
    return { nome: "", email: "", cpf: gerarCPF(), endereco: gerarEnderecoMock() };
  }

  static gerarDadosMock(email) {
    return { nome: "", email, cpf: gerarCPF(), endereco: gerarEnderecoMock() };
  }

  // --- CADASTRO ---
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
      `INSERT INTO enderecos (usuario_id, cep, rua, numero, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [result.insertId, enderecoFinal.cep, enderecoFinal.rua, enderecoFinal.numero, enderecoFinal.bairro, enderecoFinal.cidade, enderecoFinal.estado]
    );

    return new Usuario(result.insertId, nome, email, cpfFinal, hashedPassword, enderecoFinal);
  }

  // --- LOGIN ---
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

  // --- BUSCAS ---
  static async buscarPorEmail(email) {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return null;

    const userData = users[0];
    const [enderecos] = await db.query("SELECT * FROM enderecos WHERE usuario_id = ?", [userData.id]);

    return new Usuario(userData.id, userData.nome, userData.email, userData.cpf, userData.password, enderecos[0] || null);
  }

  static async buscarPorId(id) {
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (users.length === 0) return null;

    const userData = users[0];
    const [enderecos] = await db.query("SELECT * FROM enderecos WHERE usuario_id = ?", [id]);

    return new Usuario(userData.id, userData.nome, userData.email, userData.cpf, userData.password, enderecos[0] || null);
  }

  // --- ATUALIZAÇÃO ---
  static async atualizarUsuario(id, nome, email, password = null, cpf = null, endereco = null) {
    const updates = [];
    const params = [];

    if (nome) { updates.push("nome = ?"); params.push(nome); }
    if (email) { updates.push("email = ?"); params.push(email); }
    if (cpf) { updates.push("cpf = ?"); params.push(cpf); }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      params.push(hashedPassword);
    }

    if (updates.length > 0) {
      const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
      params.push(id);
      await db.query(sql, params);
    }

    if (endereco) {
      // Atualiza ou insere endereço
      const [rows] = await db.query("SELECT * FROM enderecos WHERE usuario_id = ?", [id]);
      if (rows.length > 0) {
        await db.query(
          `UPDATE enderecos SET cep = ?, rua = ?, numero = ?, bairro = ?, cidade = ?, estado = ? WHERE usuario_id = ?`,
          [endereco.cep, endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado, id]
        );
      } else {
        await db.query(
          `INSERT INTO enderecos (usuario_id, cep, rua, numero, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [id, endereco.cep, endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado]
        );
      }
    }

    return this.buscarPorId(id);
  }

  // --- CARTÕES ---
  static async obterOuGerarCartao(usuarioId) {
    const [rows] = await db.query("SELECT * FROM cartoes WHERE usuario_id = ?", [usuarioId]);

    if (rows.length > 0) return rows[0];

    const extras = gerarDadosExtrasCartao();
    return {
      numero: gerarNumeroCartao(),
      mes: extras.mes,
      ano: extras.ano,
      cvv: extras.cvv
    };
  }

  static async salvarCartao(usuarioId, cartao) {
    if (!cartao || !usuarioId) return console.error("Dados do cartão ou ID ausentes");

    let numeroStr = Array.isArray(cartao.numero) ? cartao.numero.join('') : String(cartao.numero);
    numeroStr = numeroStr.replace(/\D/g, '');

    const [rows] = await db.query("SELECT id FROM cartoes WHERE usuario_id = ?", [usuarioId]);

    if (rows.length > 0) {
      await db.query(
        "UPDATE cartoes SET numero = ?, mes = ?, ano = ?, cvv = ? WHERE usuario_id = ?",
        [numeroStr, cartao.mes, cartao.ano, cartao.cvv, usuarioId]
      );
    } else {
      await db.query(
        "INSERT INTO cartoes (usuario_id, numero, mes, ano, cvv) VALUES (?, ?, ?, ?, ?)",
        [usuarioId, numeroStr, cartao.mes, cartao.ano, cartao.cvv]
      );
    }
  }
}

module.exports = UsuarioService;