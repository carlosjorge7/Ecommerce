const express = require('express');
const router = express.Router();

const clientesCtrl = require('../controllers/clientes.controller');
// middleware
const verifyTokenCliente = require('../lib/verify.token');

router.post('/registro', clientesCtrl.registroCliente);
router.post('/login', clientesCtrl.loginCliente);
// router.post('/login', usuarioCtrl.login);
// router.get('/:idUsuario', verifyTokenUsuario, usuarioCtrl.getUsuario);
// router.put('/', verifyTokenUsuario, usuarioCtrl.updateUser);
// router.delete('/:idUsuario', verifyTokenUsuario, usuarioCtrl.deleteUser);
// router.get('/', verifyTokenUsuario, usuarioCtrl.getUsuarios);

module.exports = router;