var express = require('express');
var router = express.Router();

/* Ruta a Carrito */
router.get('/', function(req, res, next) {
  res.render('carrito');
});

module.exports = router;
