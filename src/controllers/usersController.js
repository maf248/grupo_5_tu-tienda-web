const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { localsName } = require('ejs');
const session = require('express-session');

const usersDir = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDir, 'utf-8'));
var loginMailValue = null;
var loginPassValue = null;

const usersController = {
    login: function(req, res, next) {
        if (req.session.user != undefined) {
            res.redirect('/users/profile/'+ req.session.user.id);
         } else {
            res.render('./users/login', {loginMailValue: loginMailValue, loginPassValue: loginPassValue});
            }
        },
    validate: function(req, res, next) {
        var userFound = null;
        users.forEach(user => {
            if (req.body.user == user.email) {
            userFound = user;
            }
        })
        if (userFound != null) {
            var check = bcryptjs.compareSync(req.body.password, userFound.password);
                if (check) {
                    req.session.user = userFound;
                    
                    if(req.body.remember != undefined ) {
                        res.cookie('recordame', userFound.email, {maxAge: 1000*60*60*24})
                    } 

                    return res.redirect('/users/profile/' + userFound.id);
                                        
                } else if (!check) {
                    loginMailValue = null;
                    loginPassValue = false;
                    return res.redirect('/users/login');
                } 

        } else {
            loginPassValue = null;
            loginMailValue = false;
            return res.redirect('/users/login');
        }
        
    },
    register: function(req, res, next) {
        if (req.session.user == undefined) {
            res.render('./users/register');
         } else {
            res.redirect('/users/profile/' + req.session.user.id);
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
            if ( req.body.adminCode == "sarasa.20") {
                users[users.length -1].adminCode = true;
            }else{
                users[users.length -1].adminCode = false;
            }

            const usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersDir, usersJSON);

            res.redirect('/users/login');
            }
        }
    },
    profile: function (req, res, next) {
        if (req.session.user != undefined) {
            
            if  (req.params.id == req.session.user.id){
                
                return res.render('./users/profile');
            } else {
                res.redirect('/users/profile/' + req.session.user.id);
            }
        
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
        /*---Aqui se guarda el nombre del archivo del nuevo avatar---*/
        users[req.params.id -1].image = req.files[0].filename;

        const usersJSON = JSON.stringify(users);
		fs.writeFileSync(usersDir, usersJSON);

        res.redirect('/users/profile/'+ req.params.id)
    },
    logout: function (req, res, next) {
        /*---Aqui se resetean valores de mensajes de error----*/
        loginMailValue = null;
        loginPassValue = null;
        /*---Aqui se borra la cookie, luego se cierra la session----*/
        res.cookie('recordame', '', {maxAge: 0});

        delete req.session.user;

        res.redirect('/');
    },
    delete: function(req, res, next){
        /*---Aquí se borra el usuario del array dentro de la variable users----*/
        users.splice(req.params.id-1, 1)
         /*---Aquí se corrigen los ID de los usuarios restantes para evitar errores----*/
        for(let i=0; i <users.length; i++){
            users[i].id = i+1 
        }
        /*---Aquí se guardan los cambios en el JSON----*/
        const usersJSON = JSON.stringify(users);
        fs.writeFileSync(usersDir, usersJSON);
        /*---Aquí se resetean valores de mensajes, se borra la cookie y se cierra session----*/
        loginMailValue = null;
        loginPassValue = null;

        res.cookie('recordame', '', {maxAge: 0});

        delete req.session.user;
        /*---Aquí se redirije a inicio----*/
        res.redirect('/');
    }
}

module.exports = usersController;