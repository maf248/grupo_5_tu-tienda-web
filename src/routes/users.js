const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const registrationValidate = require('../middlewares/registrationValidate')

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


/* Rutas a Usuarios */
router.get('/login', usersController.login);
router.post('/login', usersController.validate);
router.get('/register', usersController.register);
router.post('/register', registrationValidate , usersController.createUser);
router.get('/profile/:id', usersController.profile);
router.post('/profile/:id', usersController.editProfile);
module.exports = router;

