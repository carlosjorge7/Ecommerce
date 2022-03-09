const express = require('express');
const productosCtrl = require('../controllers/productos.controller');
const router = express.Router();

// Upload
const upload = require('../lib/multer.js');

// Verify token for admins
const verifyTokenUsuario = require('../lib/verify.token');

// Gestion de productos
router.post('/', verifyTokenUsuario, upload.single('imagen'), productosCtrl.createProducto); // Pendiente de probar
router.get('/', productosCtrl.getProductos);
router.get('/:idProducto', productosCtrl.getProducto)
router.put('/:idProducto', verifyTokenUsuario, productosCtrl.updateProducto)
router.delete('/:idProducto', verifyTokenUsuario, productosCtrl.deleteProducto)

module.exports = router;