const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const fs = require('fs');
const db = require('../database/models');


// ************ Controller Require ************
const productosController = require("../controllers/productosController");

// ************ Multer ************
const storage = multer.diskStorage({
    destination: function(req, file, cb) {

    // ***** Funcion p/ Obtener el product ID correspondiente y luego utilizarlo con multer *****
    function productID (id) {
            
            if(id != undefined) { 

                const prodID = 'Producto-' + id;
                    const dir = path.join('public', 'images', prodID);
                    if (!fs.existsSync(dir)) {
                    return fs.mkdir(dir, error => cb(error, dir))
                    }
                    return cb(null, dir);

            } else {

                db.Product.count()
                .then((lastId) => {
                    let newId = lastId + 1;
                    const prodID = 'Producto-' + newId;
                    const dir = path.join('public', 'images', prodID);
                    if (!fs.existsSync(dir)) {
                    return fs.mkdir(dir, error => cb(error, dir))
                    }
                    return cb(null, dir);
                });
            }
    }
    
    productID(req.params.id);

    },
    filename: function(req, file, cb) {
           
     return cb(null, 'Imagen' + '_' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

/* Rutas a Productos */
router.get('/', productosController.listado);

/*---Rutas para crear GET---*/
router.get('/create', productosController.creacionProduct);
router.get('/create/categories', productosController.creacionCategory);
router.get('/create/benefits', productosController.creacionBenefits);
router.get('/create/sections', productosController.creacionSections);
router.get('/create/contents', productosController.creacionContents);

/*---Rutas para crear POST---*/
router.post('/', upload.any(), productosController.creador);


/*---Rutas para editar GET---*/
router.get('/:id/edit', productosController.edicionProduct);
router.get('/:id/edit/categories', productosController.edicionCategories);
router.get('/:id/edit/benefits', productosController.edicionBenefits);
router.get('/:id/edit/sections', productosController.edicionSections);
router.get('/:id/edit/contents', productosController.edicionContents);


/*---Rutas para crear POST---*/
router.put('/:id', upload.any(), productosController.editor);


router.get('/:id', productosController.detalle);

router.delete('/:id', productosController.borrado);

module.exports = router;
