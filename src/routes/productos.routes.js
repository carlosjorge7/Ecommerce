const express = require('express');
const productosCtrl = require('../controllers/productos.controller');
const router = express.Router();
//const uploadCtrl = require('../controllers/upload.controller');

const upload = require('../lib/multer.js');
const verifyTokenUsuario = require('../controllers/verify.token');

// Gestion de productos
router.post('/', verifyTokenUsuario, upload.single('imagen'), productosCtrl.createProducto); // Pendiente de probar
router.get('/', productosCtrl.getProductos);
router.get('/:idProducto', productosCtrl.getProducto)
router.put('/:idProducto', verifyTokenUsuario, productosCtrl.updateProducto)
router.delete('/:idProducto', verifyTokenUsuario, productosCtrl.deleteProducto)

module.exports = router;