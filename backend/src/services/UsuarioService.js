const db = require('../database/connection');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// --- FUNÇÕES AUXILIARES (Lógica de Geração) ---

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
  const ano = (Math.floor(Math.random() * 5) + 26).toString(); 
  const cvv = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return { mes, ano, cvv };
}

class UsuarioService {

  static gerarDadosIniciais() {
    return { nome: "", email: "", cpf: gerarCPF(), endereco: gerarEnderecoMock() };
  }

  static gerarDadosMock(email) {
    return { nome: "", email, cpf: gerarCPF(), endereco: gerarEnderecoMock() };
  }

  // --- MÉTODOS DE LOGIN E CADASTRO ---

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

  static async obterOuGerarCartao(usuarioId) {
    const [rows] = await db.query("SELECT * FROM cartoes WHERE usuario_id = ?", [usuarioId]);

    if (rows.length > 0) {
      return rows[0]; 
    } else {
      const extras = gerarDadosExtrasCartao();
      return {
        numero: gerarNumeroCartao(),
        mes: extras.mes,
        ano: extras.ano,
        cvv: extras.cvv
      };
    }
  }

  static async salvarCartao(usuarioId, cartao) {
    if (!cartao || !usuarioId) {
        console.error("Erro: Dados do cartão ou ID do usuário ausentes.");
        return;
    }

    // Garante que o número seja uma string limpa de apenas números
    let numeroStr = Array.isArray(cartao.numero) 
        ? cartao.numero.join('') 
        : String(cartao.numero);
    
    numeroStr = numeroStr.replace(/\D/g, ''); // Remove tudo que NÃO for número

    // Verifica se já existe um registro para este usuário
    const [rows] = await db.query("SELECT id FROM cartoes WHERE usuario_id = ?", [usuarioId]);

    if (rows.length > 0) {
      console.log(`[DATABASE] Atualizando cartão existente para o usuário: ${usuarioId}`);
      await db.query(
        "UPDATE cartoes SET numero = ?, mes = ?, ano = ?, cvv = ? WHERE usuario_id = ?",
        [numeroStr, cartao.mes, cartao.ano, cartao.cvv, usuarioId]
      );
    } else {
      console.log(`[DATABASE] Criando novo registro de cartão para o usuário: ${usuarioId}`);
      await db.query(
        "INSERT INTO cartoes (usuario_id, numero, mes, ano, cvv) VALUES (?, ?, ?, ?, ?)",
        [usuarioId, numeroStr, cartao.mes, cartao.ano, cartao.cvv]
      );
    }
  }
}

module.exports = UsuarioService;