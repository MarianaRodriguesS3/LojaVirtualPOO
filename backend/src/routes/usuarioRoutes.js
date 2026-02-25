const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.post('/register', (req, res) => UsuarioController.register(req, res));
router.post('/login', (req, res) => UsuarioController.login(req, res));
router.post('/verificar-email', (req, res) => UsuarioController.verificarEmail(req, res)); // Rota para verificar se o email existe
router.put('/editar/:id', (req, res) => UsuarioController.editarUsuario(req, res));

module.exports = router;