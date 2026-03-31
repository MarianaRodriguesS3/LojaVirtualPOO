const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.post('/register', (req, res) => UsuarioController.register(req, res));
router.post('/login', (req, res) => UsuarioController.login(req, res));
router.post('/verificar-email', (req, res) => UsuarioController.verificarEmail(req, res));
router.put('/editar/:id', (req, res) => UsuarioController.editarUsuario(req, res));
router.get('/dados-iniciais', (req, res) => UsuarioController.dadosIniciais(req, res));
router.get('/dados-usuario', (req, res) => UsuarioController.dadosUsuario(req, res));
router.get('/cartao', (req, res) => UsuarioController.obterCartao(req, res));
router.post('/cartao', (req, res) => UsuarioController.salvarCartao(req, res));
router.post('/finalizar-compra', (req, res) => UsuarioController.finalizarCompra(req, res));

module.exports = router;