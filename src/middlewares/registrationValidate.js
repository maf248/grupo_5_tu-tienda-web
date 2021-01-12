const {check} = require('express-validator');

module.exports = [
    check('firstName')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 1 carater'),
    check('lastName')
    .isLength({min:3})
    .withMessage('Este campo debe contener al menos 1 carater'),
    check('email')
        .isEmail()
        .withMessage('Tiene que tener un formato de email válido'),
    check('password')
        .isStrongPassword()
        .withMessage('La contraseña debe tener un mínimo de 8 caracteres, incluyendo una minúscula, una mayúscula, un número y un símbolo'),

]