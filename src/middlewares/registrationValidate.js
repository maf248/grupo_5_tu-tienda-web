const {check, body} = require('express-validator');

const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');

const usersDir = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDir, 'utf-8'));

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
            for (let i = 0; i < users.length; i++) {
                console.log(users[i].email);
                console.log(value);
                /*---Si coinciden los mails, pero NO los ID, significa que otro usuario tiene ese mail---*/
                if(users[i].email == value) {
                    if (req.session.user != undefined) {
                        if (users[i].id == req.session.user.id) {
                            return true;
                        }
                        return false;
                    }
                    return false;
                }
            }
            return true;
        })
        .withMessage('El email que ingresaste ya está registrado')

]