const {check, body} = require('express-validator');
const db = require('../database/models');
const path = require('path');
const fs = require('fs');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

module.exports =[
    body('newBenefitName')
    .isLength({min:3})
    .withMessage('Debe contener al menos 3 carateres'),
    body('newBenefitCat1')
    .custom((value, {req}) => {
        if (value || req.body.newBenefitCat2 || req.body.newBenefitCat3) {
            return true;
        }
        return false;
    })
    .withMessage('El beneficio debe estar asociado por lo menos a una categoría')
    
]