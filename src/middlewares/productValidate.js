const {check, body} = require('express-validator');
const db = require('../database/models');
const path = require('path');
const fs = require('fs');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

module.exports = [
    check('name')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 3 carateres'),
    body('image')
    .custom(function(value, {req}) {
        if (req.params.id) {
            if (typeof req.file != 'undefined') {

                var extension = (path.extname(req.file.filename)).toLowerCase();
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
 
            if (typeof req.file != 'undefined') {
                
                var extension = (path.extname(req.file.filename)).toLowerCase();
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
    .withMessage('Debe subir una imagen en formatos: jpg, jpeg o png'),

    check('titleBanner1')
    .isLength({min:3})
    .withMessage('Debes completar este campo con al menos 3 caracteres'),
    check('subtitleBanner1')
    .isLength({min:3})
    .withMessage('Debes completar este campo con al menos 3 caracteres')
    
        
]