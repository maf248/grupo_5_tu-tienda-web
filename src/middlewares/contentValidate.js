const {check, body} = require('express-validator');
const db = require('../database/models');
const path = require('path');
const fs = require('fs');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

module.exports = [
    check('contentSubtitle')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 3 carateres'),
    check('contentsDescription')
    .isLength({min:10})
    .withMessage('Este campo debe contener al menos 10 carateres'),
    body('contentIcon')
    .custom(function(value, {req}) {
        if (req.params.id) {
            if (typeof req.files[0] != 'undefined') {

                var extension = (path.extname(req.files[0].filename)).toLowerCase();
                switch (extension) {
                case '.svg':
                    return true;
                }
            }
            return true;

        } else {
 
            if (typeof req.files[0] != 'undefined') {
                
                var extension = (path.extname(req.files[0].filename)).toLowerCase();
                switch (extension) {
                case '.svg':
                    return true;
                }
            }
            return false;
        }
    })
    .withMessage('Debe subir una imagen en formato svg')
]