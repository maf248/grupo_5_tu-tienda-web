const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// ************ Controller Require ************
const productosController = require("../controllers/productosController");

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
     return cb(null, 'public/images');
    },
    filename: function(req, file, cb) {
     return cb(null, 'product' + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

/* Rutas a Productos */
router.get('/', productosController.listado);
router.post('/', upload.any(), productosController.creador);
router.get('/create', productosController.creacion);
router.get('/:id', productosController.detalle);
router.put('/:id', upload.any(), productosController.editor);
router.get('/:id/edit', productosController.edicion);
router.delete('/:id', productosController.borrado);

module.exports = router;
