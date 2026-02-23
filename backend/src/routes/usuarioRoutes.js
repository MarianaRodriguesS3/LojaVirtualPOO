// routes/usuarioRoutes.js
const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

// Rotas existentes
router.post('/register', (req, res) => UsuarioController.register(req, res));
router.post('/login', (req, res) => UsuarioController.login(req, res));

// Nova rota para verificar se o email existe
router.post('/verificar-email', (req, res) => UsuarioController.verificarEmail(req, res));

// Nova rota para editar usuário
router.put('/editar/:id', (req, res) => UsuarioController.editarUsuario(req, res));

module.exports = router;