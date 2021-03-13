const {check, body} = require('express-validator');
const db = require('../database/models');
const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

module.exports = [
    check('user')
        .isEmail()
        .withMessage('Formato de email invalido'),
    check('user')
        .custom(async function(value, {req}) {
                let user;
                try {
                    user = await db.User.findOne({
                        where: {
                            email: req.body.user
                        }
                    });
              
                    if (user == null) {
                        return Promise.reject();
        
                    } else if (user != null) {
                        return true;
                    }

                } catch (error) {
                    console.log(error);
                }
                
        })
        .withMessage('El email introducido NO se encuentra registrado'),
    body('password')
        .custom(async function(value, {req}) {
            let user;
                try {
                    user = await db.User.findOne({
                        where: {
                            email: req.body.user
                        }
                    });
                    
                    var check = bcryptjs.compareSync(req.body.password, user.password);
                   
                    if (check) {
                        return true;
                    } else {
                        return Promise.reject();
                    }

                } catch (error) {
                    console.log(error);
                }

            
        })
        .withMessage('La contraseña es incorrecta')
]