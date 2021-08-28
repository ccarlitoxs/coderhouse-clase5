const express = require('express');
const router = express.Router();
const productController = require('../controller/controllerProduct')
const controller = new productController


/* home page. */
router.get('/', controller.listaProductos);
router.post('/productos', controller.agregarProductos);

module.exports = router;
