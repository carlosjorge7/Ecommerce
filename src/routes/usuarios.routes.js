const express = require('express');
const router = express.Router();

const usuarioCtrl = require('../controllers/usuarios.controller');
// middleware
const verifyTokenUsuario = require('../lib/verify.token');

router.post('/registro', usuarioCtrl.registrar);
router.post('/login', usuarioCtrl.login);
router.get('/:idUsuario', verifyTokenUsuario, usuarioCtrl.getUsuario);
router.put('/', verifyTokenUsuario, usuarioCtrl.updateUser);
router.delete('/:idUsuario', verifyTokenUsuario, usuarioCtrl.deleteUser);
router.get('/', verifyTokenUsuario, usuarioCtrl.getUsuarios);

module.exports = router;