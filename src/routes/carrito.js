var express = require('express');
var router = express.Router();
var carritoController = require("../controllers/carritoController");

/* Ruta a Carrito */
router.get('/', carritoController.carrito);

module.exports = router;
