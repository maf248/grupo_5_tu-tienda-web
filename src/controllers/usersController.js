const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { localsName } = require('ejs');
const session = require('express-session');

const usersDir = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDir, 'utf-8'));
var loginMailValue = true;
var loginPassValue = true;


const usersController = {
    login: function(req, res, next) {
        if (req.session.user != undefined) {
            res.redirect('/users/profile/'+ req.session.user.id);
         } else {
             loginMailValue = true;
             loginPassValue = true
            res.render('./users/login', {loginMailValue: loginMailValue, loginPassValue: loginPassValue});
            }
        },
    validate: function(req, res, next) {
        users.forEach(user => {
            if (req.body.user == user.email) {
            var check = bcryptjs.compareSync(req.body.password, user.password);
            if (check ) {
                
                req.session.user = user;

                if(req.body.remember != undefined ) {
                    res.cookie('recordame', user.email, {maxAge: 1000*60*60*24})
                }

                res.redirect('./profile/' + user.id);
               
            } else {
                loginPassValue = false;
                res.render('./users/login', {loginPassValue : loginPassValue, loginMailValue : loginMailValue});
             }
            }
            if (req.body.email == user.email) {
                res.redirect('./profile/' + user.id);
            } else {
                loginMailValue = false
                res.render('./users/login', {loginMailValue : loginMailValue, loginPassValue: loginPassValue});
            }
        })
        
    },
    register: function(req, res, next) {
        if (req.session.user != undefined) {
            res.redirect('/users/profile/'+ req.session.user.id);
         } else {
        res.render('./users/register');
        }
    },
    createUser: function(req, res) {
        
        let errors = validationResult(req);
        let mailDuplicated = false;
        
        if (!errors.isEmpty()) {
            return res.render('./users/register', {errors: errors.errors} );
        } else {
            users.forEach( user => {
                if (user.email == req.body.email) {
                    mailDuplicated = true;
                    return res.send('Este mail ya está registrado');
                }
            });
            
            if (!mailDuplicated) {       
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

            res.redirect('/users/login');
            }
        }
    },
    profile: function (req, res, next) {
        if (req.session.user != undefined) {
            res.render('./users/profile');
        } else {
            res.redirect('/users/login')
        }

    },
    editProfile: function (req, res, next) {
        /*-----Acá editamos la info del usuario-----*/
        
        users[req.params.id -1].firstName = req.body.firstName
        users[req.params.id -1].lastName = req.body.lastName
        users[req.params.id -1].email = req.body.email

        if (req.body.password != "") {
            if (req.body.passwordRepeat == req.body.password) {
                users[req.params.id -1].password = bcryptjs.hashSync(req.body.password, 10);
            }
            
        }
        if (req.body.plan != "") {
            users[req.params.id -1].plan = req.body.plan;
        }

        if (req.body.category != "") {
            users[req.params.id -1].category = req.body.category;
        }

        

        /*-----Guardamos datos en el users.json-----*/

        const usersJSON = JSON.stringify(users);
		fs.writeFileSync(usersDir, usersJSON);
		res.redirect('/users/profile/'+ req.params.id);

    },
    photoUpdate: function (req, res, next) {
        
        users[req.params.id -1].image = req.files[0].filename;

        const usersJSON = JSON.stringify(users);
		fs.writeFileSync(usersDir, usersJSON);

        res.redirect('/users/profile/'+ req.params.id)
    },
    logout: function (req, res, next) {

        
        res.cookie('recordame', '', {maxAge: 0});
        delete req.session.user;

        res.redirect('/');
    }
}

module.exports = usersController;