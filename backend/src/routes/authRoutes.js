const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/connection");

const router = express.Router();

const JWT_SECRET = "SEGREDO_SUPER_SEGURO"; // depois coloque em .env

// ======================
// CADASTRO
// ======================
router.post("/register", async (req, res) => {
  const { nome, email, password, confirmPassword } = req.body;

  // Validação básica
  if (!nome || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Senha deve ter no mínimo 8 caracteres"
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "As senhas não coincidem"
    });
  }

  try {
    // Verifica se email já existe
    const [existing] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email já cadastrado"
      });
    }

    // Criptografa senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insere usuário com nome
    await db.query(
      "INSERT INTO users (nome, email, password) VALUES (?, ?, ?)",
      [nome, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuário criado com sucesso" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "Usuário não encontrado"
      });
    }

    const user = users[0];

    // Verifica senha
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Senha inválida"
      });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Retorna token + usuário completo
    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;