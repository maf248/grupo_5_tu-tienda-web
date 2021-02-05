var express = require('express');
var router = express.Router();
var indexController = require("../controllers/indexController")

/* Ruta a Inicio */
router.get('/', indexController.home);
router.get('/test', indexController.test);

module.exports = router;
