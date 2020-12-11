var express = require('express');
var router = express.Router();
var productosController = require("../controllers/productosController");

/* Rutas a Productos */
router.get('/', function(req, res, next) {
  res.render('producto'/*, { title: 'Express' }*/);
});

router.get('/:id', productosController.detalle);

module.exports = router;
