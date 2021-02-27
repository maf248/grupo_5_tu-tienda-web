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
router.get('/create', productosController.createProduct);
router.get('/:id/create/categories', productosController.createCategory);
router.get('/:id/create/benefits', productosController.createBenefits);
router.get('/:id/create/sections', productosController.createSections);
router.get('/:id/create/contents', productosController.createContents);

/*---Rutas para crear POST---*/
//router.post('/', upload.any(), productosController.creador);

router.post('/create', upload.any(), productosController.saveProduct);
router.post('/:id/create/categories', upload.any(), productosController.saveCategories);
router.post('/:id/create/benefits', productosController.saveBenefits);
router.post('/:id/create/sections', upload.any(), productosController.saveSections);
router.post('/:id/create/contents', upload.any(), productosController.saveContents);

/*---Rutas para editar GET---*/
router.get('/:id/edit', productosController.editProduct);
router.get('/:id/edit/categories', productosController.editCategories);
router.get('/:id/edit/benefits', productosController.editBenefits);
router.get('/:id/edit/sections', productosController.editSections);
router.get('/:id/edit/sections/:section', productosController.showSection);
router.get('/:id/edit/contents', productosController.editContents);


/*---Rutas para editar POST---*/
//router.put('/:id', upload.any(), productosController.editor);

router.put('/:id/edit', upload.any(), productosController.modifyProduct);
router.put('/:id/edit/categories', upload.any(), productosController.modifyCategories);
router.put('/:id/edit/benefits', productosController.modifyBenefits);
router.put('/:id/edit/sections/:section/edited-section', upload.any(), productosController.modifySection);
router.put('/:id/edit/contents', upload.any(), productosController.modifyContents);

router.get('/:id', productosController.detalle);

router.delete('/:id', productosController.borrado);

module.exports = router;
