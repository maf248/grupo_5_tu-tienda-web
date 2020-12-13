var express = require('express');
var router = express.Router();
var productosController = require("../controllers/productosController");

/* Rutas a Productos */
router.get('/listado', productosController.listado);
router.get('/:id', productosController.detalle);


module.exports = router;
