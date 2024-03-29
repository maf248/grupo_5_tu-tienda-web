const {check, body} = require('express-validator');
const db = require('../database/models');
const path = require('path');
const fs = require('fs');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

module.exports = [
    body('contentSubtitle')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 3 carateres'),
    body('contentDescription')
    .isLength({min:10})
    .withMessage('Este campo debe contener al menos 10 carateres'),
    body('contentIcon')
    .custom(function(value, {req}) {

        if (req.url.includes('create')) {
            if (typeof req.file != 'undefined') {

                var extension = (path.extname(req.file.filename)).toLowerCase();
                switch (extension) {
                case '.svg':
                    return true;
                default:
                    return false;
                }

            }
            return false;

        } else {
 
            if (typeof req.file != 'undefined') {
                
                var extension = (path.extname(req.file.filename)).toLowerCase();
                switch (extension) {
                case '.svg':
                    return true;
                default:
                    return false;
                }
            }
            return true;
        }
    })
    .withMessage('Debe subir una imagen en formato svg')
]