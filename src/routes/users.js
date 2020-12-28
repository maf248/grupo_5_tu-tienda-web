const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// ************ Controller Require ************
var usersController = require("../controllers/usersController");

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
     return cb(null, 'public/images/users');
    },
    filename: function(req, file, cb) {
     return cb(null, 'user' + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

/* Ruta a Usuarios */
router.get('/login', usersController.login);
//router.post('/login', productosController.validate);
router.get('/register', usersController.register);
//router.post('/', upload.any(), productosController.createUser);

module.exports = router;

