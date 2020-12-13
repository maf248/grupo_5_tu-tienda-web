var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersController");

/* Ruta a Usuarios */
router.get('/:id', usersController.main);

module.exports = router;

