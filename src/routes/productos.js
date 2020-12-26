var express = require('express');
var router = express.Router();
var productosController = require("../controllers/productosController");

/* Rutas a Productos */
router.get('/', productosController.listado);
router.post('/', productosController.creador);
router.get('/create', productosController.creacion);
router.get('/:id', productosController.detalle);
router.put('/:id', productosController.editor);
router.get('/:id/edit', productosController.edicion);

//router.delete('/:id', productosController.borrado);

module.exports = router;
