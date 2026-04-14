const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// ... (Funções auxiliares permanecem iguais)

class UsuarioService {

  static gerarDadosIniciais() {
    return { nome: "", email: "", cpf: gerarCPF(), endereco: gerarEnderecoMock() };
  }

  // --- CADASTRO ---
  static async cadastrarUsuario(nome, email, senha, cpf = null, endereco = null) {
    // 1. No pg, não usamos [existing]. Usamos result.rows
    const existingResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingResult.rows.length > 0) throw new Error("Email já cadastrado");

    const hashedPassword = await bcrypt.hash(senha, 10);
    const cpfFinal = cpf || gerarCPF();

    // 2. Usamos $1, $2... e RETURNING id para pegar o ID inserido no Postgres
    const result = await db.query(
      "INSERT INTO users (nome, email, cpf, password) VALUES ($1, $2, $3, $4) RETURNING id",
      [nome, email, cpfFinal, hashedPassword]
    );
    
    const insertId = result.rows[0].id;

    const enderecoFinal = endereco || gerarEnderecoMock();
    await db.query(
      `INSERT INTO enderecos (usuario_id, cep, rua, numero, bairro, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [insertId, enderecoFinal.cep, enderecoFinal.rua, enderecoFinal.numero, enderecoFinal.bairro, enderecoFinal.cidade, enderecoFinal.estado]
    );

    return new Usuario(insertId, nome, email, cpfFinal, hashedPassword, enderecoFinal);
  }

  // --- LOGIN ---
  static async logarUsuario(email, senha) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) throw new Error("Usuário não encontrado");

    const userData = result.rows[0];
    const enderecoResult = await db.query("SELECT * FROM enderecos WHERE usuario_id = $1", [userData.id]);

    const usuario = new Usuario(
      userData.id,
      userData.nome,
      userData.email,
      userData.cpf,
      userData.password,
      enderecoResult.rows[0] || null
    );

    const senhaValida = await usuario.validarSenha(senha);
    if (!senhaValida) throw new Error("Senha inválida");

    return usuario;
  }

  // --- BUSCAS ---
  static async buscarPorEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return null;

    const userData = result.rows[0];
    const enderecoResult = await db.query("SELECT * FROM enderecos WHERE usuario_id = $1", [userData.id]);

    return new Usuario(userData.id, userData.nome, userData.email, userData.cpf, userData.password, enderecoResult.rows[0] || null);
  }

  static async buscarPorId(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;

    const userData = result.rows[0];
    const enderecoResult = await db.query("SELECT * FROM enderecos WHERE usuario_id = $1", [id]);

    return new Usuario(userData.id, userData.nome, userData.email, userData.cpf, userData.password, enderecoResult.rows[0] || null);
  }

  // --- ATUALIZAÇÃO ---
  static async atualizarUsuario(id, nome, email, password = null, cpf = null, endereco = null) {
    const updates = [];
    const params = [];
    let count = 1;

    if (nome) { updates.push(`nome = $${count++}`); params.push(nome); }
    if (email) { updates.push(`email = $${count++}`); params.push(email); }
    if (cpf) { updates.push(`cpf = $${count++}`); params.push(cpf); }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push(`password = $${count++}`);
      params.push(hashedPassword);
    }

    if (updates.length > 0) {
      const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = $${count++}`;
      params.push(id);
      await db.query(sql, params);
    }

    if (endereco) {
      const checkEndereco = await db.query("SELECT * FROM enderecos WHERE usuario_id = $1", [id]);
      if (checkEndereco.rows.length > 0) {
        await db.query(
          `UPDATE enderecos SET cep = $1, rua = $2, numero = $3, bairro = $4, cidade = $5, estado = $6 WHERE usuario_id = $7`,
          [endereco.cep, endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado, id]
        );
      } else {
        await db.query(
          `INSERT INTO enderecos (usuario_id, cep, rua, numero, bairro, cidade, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [id, endereco.cep, endereco.rua, endereco.numero, endereco.bairro, endereco.cidade, endereco.estado]
        );
      }
    }

    return this.buscarPorId(id);
  }

  // --- CARTÕES ---
  static async obterOuGerarCartao(usuarioId) {
    const result = await db.query("SELECT * FROM cartoes WHERE usuario_id = $1", [usuarioId]);

    if (result.rows.length > 0) return result.rows[0];

    const extras = gerarDadosExtrasCartao();
    return {
      numero: gerarNumeroCartao(),
      mes: extras.mes,
      ano: extras.ano,
      cvv: extras.cvv
    };
  }

  static async salvarCartao(usuarioId, cartao) {
    if (!cartao || !usuarioId) return;

    let numeroStr = Array.isArray(cartao.numero) ? cartao.numero.join('') : String(cartao.numero);
    numeroStr = numeroStr.replace(/\D/g, '');

    const result = await db.query("SELECT id FROM cartoes WHERE usuario_id = $1", [usuarioId]);

    if (result.rows.length > 0) {
      await db.query(
        "UPDATE cartoes SET numero = $1, mes = $2, ano = $3, cvv = $4 WHERE usuario_id = $5",
        [numeroStr, cartao.mes, cartao.ano, cartao.cvv, usuarioId]
      );
    } else {
      await db.query(
        "INSERT INTO cartoes (usuario_id, numero, mes, ano, cvv) VALUES ($1, $2, $3, $4, $5)",
        [usuarioId, numeroStr, cartao.mes, cartao.ano, cartao.cvv]
      );
    }
  }
}

module.exports = UsuarioService;