const express = require('express');
const categoriasCtrl = require('../controllers/categorias.controller');
const router = express.Router();

// Verify token for admins
const verifyTokenUsuario = require('../lib/verify.token');

router.post('/', verifyTokenUsuario, categoriasCtrl.createCategoria);
router.get('/', verifyTokenUsuario, categoriasCtrl.getCategorias);
router.get('/:idCategoria', verifyTokenUsuario, categoriasCtrl.getCategoria)
router.put('/:idCategoria', verifyTokenUsuario, categoriasCtrl.updateCategoria)
router.delete('/:idCategoria', verifyTokenUsuario, categoriasCtrl.deleteCategoria)

module.exports = router;