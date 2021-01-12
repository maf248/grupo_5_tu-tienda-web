const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const registrationValidate = require('../middlewares/registrationValidate')

// ************ Controller Require ************
var usersController = require("../controllers/usersController");
const { localsName } = require('ejs');

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // ************ Funcion p/ Obtener el product ID y luego utilizarlo con multer ************
        let dirImage = path.join('public', 'images', 'users')
     return cb(null, dirImage);
    },
    filename: function(req, file, cb) {
           
     return cb(null, 'Usuario-' + req.params.id + '_' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});


/* Rutas a Usuarios */
router.get('/login', usersController.login);
router.post('/login', usersController.validate);
router.get('/register', usersController.register);
router.post('/register', registrationValidate, usersController.createUser);
router.get('/profile/:id', usersController.profile);
router.patch('/profile/:id', registrationValidate, usersController.editProfile);
router.post('/profile/:id/avatar', upload.any(), usersController.photoUpdate);
router.post('/logout', usersController.logout);
module.exports = router;

