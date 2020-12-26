var express = require('express');
var router = express.Router();
var productosController = require("../controllers/productosController");

/* Rutas a Productos */
router.get('/', productosController.listado);
router.get('/create', productosController.creador);
router.post('/', productosController.creacion);
router.get('/:id', productosController.detalle);


//router.get('/:id/edit', productosController.creacion);
//router.put('/:id', productosController.edicion);
//router.delete('/:id', productosController.borrado);

module.exports = router;
