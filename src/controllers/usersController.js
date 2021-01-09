const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const usersDir = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDir, 'utf-8'));

const usersController = {
    login: function(req, res, next) {
                res.render('./users/login');
            },
    register: function(req, res, next) {
        res.render('./users/register');
    },
    createUser: function(req, res) {
        
        let errors = validationResult(req);
        console.log(errors)

        if (!errors.isEmpty()) {
            return res.render('./users/register', {errors: errors.errors} );
        } else {
            users.forEach( user => {
                if (user.email == req.body.email) {
                    return res.send('Este mail ya está registrado')
                }
            });
        users.push( 
            {
            "id": users.length +1,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password":  bcryptjs.hashSync(req.body.password, 10)
            }
        )
        const usersJSON = JSON.stringify(users);
        fs.writeFileSync(usersDir, usersJSON);

        res.send('Te registraste correctamente');
        }
    }
}

module.exports = usersController;