const express = require('express');
const productosCtrl = require('../controllers/Productos.controller');
const router = express.Router();

const verifyTokenUsuario = require('../controllers/verify.token');

router.post('/', verifyTokenUsuario, productosCtrl.createProducto)
router.get('/', productosCtrl.getProductos)
router.get('/:idProducto', productosCtrl.getProducto)
router.put('/:idProducto', verifyTokenUsuario, productosCtrl.updateProducto)
router.delete('/:idProducto', verifyTokenUsuario, productosCtrl.deleteProducto)

module.exports = router;