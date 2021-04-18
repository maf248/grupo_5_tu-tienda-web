var express = require('express');
var router = express.Router();
var carritoController = require("../controllers/carritoController");

/* Ruta a Carrito */
router.get('/', carritoController.carrito);

router.post('/add/:productID/:categoryID', carritoController.add)

module.exports = router;
