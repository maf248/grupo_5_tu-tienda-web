const {check, body} = require('express-validator');
const db = require('../database/models');
const path = require('path');
const fs = require('fs');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

module.exports =[
    body('benefit1Name')
    .custom((value, {req}) => {
        let benefitNamesOk = [];
        for (let i= 1 ; i < 50; i++) {
            if (typeof req.body[`benefit${i}Name`] != 'undefined') {
                
                if (req.body[`benefit${i}Name`].length > 3) {
                    benefitNamesOk[i] = true;
                } else {
                    benefitNamesOk[i] = false;
                }
                
            }
            
        }
        if (benefitNamesOk.includes(false)) {
            return false;
        } else {
            return true;
        }
        
    })
    .withMessage('Los beneficios deben contener al menos 3 carateres'),
    body('benefit1Cat1')
    .custom((value, {req}) => {
        let benefitCatOk = [];
        let index = 0;
        for (let i= 1 ; i < 50; i++) {
            if (typeof req.body[`benefit${i}Name`] != 'undefined') {
            index++
            }
        }
        console.log('ESTE ES INDEX AMIWOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO : ' + index);
        
        for (let j= 1 ; j <= index ; j++) {
               
                if (req.body[`benefit${j}Cat1`] != undefined || req.body[`benefit${j}Cat2`] != undefined || req.body[`benefit${j}Cat3`] != undefined) {
                benefitCatOk[j-1] = true;
                
                } else {
                benefitCatOk[j-1] = false;
                }
        }
        
        if (benefitCatOk.includes(false)) {
            return false;
        } else {
            return true;
        }
        
        
    })
    .withMessage('Los beneficios deben estar asociados al menos a una categoría')
   
    
]