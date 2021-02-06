const {check, body} = require('express-validator');
const db = require('../database/models');
const path = require('path');
const fs = require('fs');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');

module.exports = [
    check('firstName')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 3 carateres'),
    check('lastName')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 3 carateres'),
    check('email')
        .isEmail()
        .withMessage('Tiene que tener un formato de email válido'),
    check('password')
        .isStrongPassword()
        .withMessage('La contraseña debe tener un mínimo de 8 caracteres, incluyendo una minúscula, una mayúscula, un número y un símbolo'),
    body('passwordRepeat')
        .custom(function(value, {req}) {
            if (value == req.body.password) {
                return true;
            }
            return false;
        })
        .withMessage('Las contraseñas no coinciden, intentá nuevamente'),
    body('email')
        .custom(function(value, {req}) {           
            db.User.findAll().then(user => {
                console.log(user)
                /*---Si coinciden los mails, pero NO los ID, significa que otro usuario tiene ese mail---*/
                if(user.email == value) {
                    if (req.session.user != undefined) {
                        if (user.id == req.session.user.id) {
                            return true;
                        }
                        return false;
                    }
                    return false;
                }
                return true;          
            }).catch(err => {
                let ErrorsJSON = JSON.stringify(err);
                fs.appendFileSync(ErrorsDir, ErrorsJSON);
            })            
        })
        .withMessage('El email que ingresaste ya está registrado')

]