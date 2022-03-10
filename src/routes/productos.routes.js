const express = require('express');
const productosCtrl = require('../controllers/productos.controller');
const router = express.Router();

// Upload
const upload = require('../lib/multer.js');

// Verify token for admins
const verifyTokenUsuario = require('../lib/verify.token');

/**
 * @swagger
 * components:
 *  schemas:
 *    Producto:
 *      type: object
 *      properties:
 *          sku:
 *            type: string
 *            description: codigo del producto
 *          nombre:
 *            type: string
 *          descripcion:
 *            type: string
 *          precio:
 *            type: number
 *          stock:
 *            type: integer
 *          imagen:
 *            type: string
 *            description: URL de la imagen el el servidor
 *          idCategoria:
 *             type: integer
 *             description: idCategoria de la categoria a la que pertenece el producto
 * 
 *  parameters:
 *    idProducto:
 *      in: path
 *      name: idProducto
 *      required: true
 *      schema:
 *        type: number
 *      description: the producto id
 */

/**
 * @swagger
 * tags:
 *  name: Producto
 *  description: Producto endpoint
 */

/**
 * @swagger
 * /productos:
 *  post:
 *    summary: crear nuevo producto
 *    tags: [Producto]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Producto'
 *    responses:
 *      200:
 *        description: El producto ha sido creado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Producto'
 *      401:
 *        description: Internal error
 *      500:
 *        description: Error server
 *
 */
router.post('/', verifyTokenUsuario, upload.single('imagen'), productosCtrl.createProducto);

/**
 * @swagger
 * /productos:
 *  get:
 *    summary: Return a list products
 *    tags: [Producto]
 *    responses: 
 *      200:
 *        description: the list of products
 *        content:
 *           application/json:
 *               schemas:
 *                 type: array
 *                 items:
 *                    $ref: '#/components/schemas/Producto'
 *      401:
 *        description: the task was not found
 *      500:
 *        description: Server error
 */
router.get('/', productosCtrl.getProductos);

/**
 * @swagger
 * /productos/{idProducto}:
 *  get:
 *    summary: get a product by Id
 *    tags: [Producto]
 *    parameters:
 *      - $ref: '#/components/parameters/idProducto'
 *    responses:
 *      200:
 *        description: The Found Task
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Producto'
 *      401:
 *        description: the task was not found
 *      500:
 *        description: Server error
 */
router.get('/:idProducto', productosCtrl.getProducto)
router.put('/:idProducto', verifyTokenUsuario, productosCtrl.updateProducto)
router.delete('/:idProducto', verifyTokenUsuario, productosCtrl.deleteProducto)

module.exports = router;

// SWAGGER:  https://www.youtube.com/watch?v=9bO0L1rfkvU