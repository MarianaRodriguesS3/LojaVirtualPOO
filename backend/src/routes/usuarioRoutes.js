const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.post('/register', (req, res) => UsuarioController.register(req, res));
router.post('/login', (req, res) => UsuarioController.login(req, res));
router.post('/verificar-email', (req, res) => UsuarioController.verificarEmail(req, res));
router.put('/editar/:id', (req, res) => UsuarioController.editarUsuario(req, res));

// 🔥 Novo endpoint para cadastro inicial
router.get('/dados-iniciais', (req, res) => UsuarioController.dadosIniciais(req, res));

module.exports = router;