const {check, body} = require('express-validator');
const db = require('../database/models');
const path = require('path');
const fs = require('fs');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

module.exports = [
    check('category1')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 3 carateres'),
    check('category2')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 3 carateres'),
    check('category3')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 3 carateres'),
    body('categoryImage1')
    .custom(function(value, {req}) {
        if (req.params.id) {
            if (typeof req.files[0] != 'undefined') {

                var extension = (path.extname(req.files[0].filename)).toLowerCase();
                switch (extension) {
                case '.jpg':
                    return true;
                case '.jpeg':
                    return true;
                case  '.png':
                    return true;
                default:
                    return false;
                }
            }
            return true;

        } else {
 
            if (typeof req.files[0] != 'undefined') {
                
                var extension = (path.extname(req.files[0].filename)).toLowerCase();
                switch (extension) {
                case '.jpg':
                    return true;
                case '.jpeg':
                    return true;
                case  '.png':
                    return true;
                default:
                    return false;
                }
            }
            return false;
        }
    })
    .withMessage('Debes subir una imagen en formatos: jpg, jpeg o png'),
    body('categoryImage2')
    .custom(function(value, {req}) {
        if (req.params.id) {
            if (typeof req.files[1] != 'undefined') {

                var extension = (path.extname(req.files[1].filename)).toLowerCase();
                switch (extension) {
                case '.jpg':
                    return true;
                case '.jpeg':
                    return true;
                case  '.png':
                    return true;
                default:
                    return false;
                }
            }
            return true;

        } else {
 
            if (typeof req.files[0] != 'undefined') {
                
                var extension = (path.extname(req.files[1].filename)).toLowerCase();
                switch (extension) {
                case '.jpg':
                    return true;
                case '.jpeg':
                    return true;
                case  '.png':
                    return true;
                default:
                    return false;
                }
            }
            return false;
        }
    })
    .withMessage('Debes subir una imagen en formatos: jpg, jpeg o png'),
    body('categoryImage3')
    .custom(function(value, {req}) {
        if (req.params.id) {
            if (typeof req.files[2] != 'undefined') {

                var extension = (path.extname(req.files[2].filename)).toLowerCase();
                switch (extension) {
                case '.jpg':
                    return true;
                case '.jpeg':
                    return true;
                case  '.png':
                    return true;
                default:
                    return false;
                }
            }
            return true;

        } else {
 
            if (typeof req.files[0] != 'undefined') {
                
                var extension = (path.extname(req.files[2].filename)).toLowerCase();
                switch (extension) {
                case '.jpg':
                    return true;
                case '.jpeg':
                    return true;
                case  '.png':
                    return true;
                default:
                    return false;
                }
            }
            return false;
        }
    })
    .withMessage('Debes subir una imagen en formatos: jpg, jpeg o png'),
    check('costoTransaccion[1]')
    .isFloat({min:0, max: 100})
    .withMessage('Debes ingresar un numero del 0 al 100'),
    check('costoTransaccion[2]')
    .isFloat({min:0, max: 100})
    .withMessage('Debes ingresar un numero del 0 al 100'),
    check('costoTransaccion[3]')
    .isFloat({min:0, max: 100})
    .withMessage('Debes ingresar un numero del 0 al 100'),
    check('cantidadSecciones1')
    .isFloat({min:1, max: 500})
    .withMessage('Debes ingresar un numero del 1 al 500'),
    check('cantidadSecciones2')
    .isFloat({min:1, max: 500})
    .withMessage('Debes ingresar un numero del 1 al 500'),
    check('cantidadSecciones3')
    .isFloat({min:1, max: 500})
    .withMessage('Debes ingresar un numero del 1 al 500'),
    check('price[0]')
    .isFloat({min:1, max: 16777215})
    .withMessage('Debes ingresar un numero mayor a 0'),
    check('price[1]')
    .isFloat({min:1, max: 16777215})
    .withMessage('Debes ingresar un numero mayor a 0'),
    check('price[2]')
    .isFloat({min:1, max: 16777215})
    .withMessage('Debes ingresar un numero mayor a 0')
    
        
]