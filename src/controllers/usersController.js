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
            res.redirect('/users/profile');
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
                        res.cookie('recordame', userFound.hashId, {maxAge: 1000*60*60*24})
                    } 

                    return res.redirect('/users/profile');
                                        
                } else if (!check) {
                    
                    return res.render('./users/login', {loginPassValue: false, loginMailValue: null, email: req.body.user});
                } 

        } else {

            return res.render('./users/login', {loginPassValue: null, loginMailValue: false, email: req.body.user});
        }
        
    },
    register: function(req, res, next) {
        if (req.session.user == undefined) {
            res.render('./users/register');
         } else {
            res.redirect('/users/profile');
            }
        
    },
    createUser: function(req, res) {
        
        let errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render('./users/register', {errors: errors.errors, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email} );
        } else {      
            users.push( 
                {
                "id": users.length +1,
                "hashId": bcryptjs.hashSync("user number " + users.length +1, 10),
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "password":  bcryptjs.hashSync(req.body.password, 10),
                "adminCode": false
                }
            )

            const usersJSON = JSON.stringify(users);
            fs.writeFileSync(usersDir, usersJSON);

            req.session.user = users[users.length -1];

            res.redirect('/users/profile');
        }
    },
    profile: function (req, res, next) {
        if (req.session.user != undefined) {

                return res.render('./users/profile');
          
            } else {
            res.redirect('/users/login')
        }

    },
    editProfile: function (req, res, next) {
        let errors = validationResult(req);
        let passwordConfirmation = false;
        console.log(passwordConfirmation);
                
        /*---Se chequean los inputs. Si no hay errores los guarda---*/
        if (errors.isEmpty()) {
            /*---Si NO hay errores en los campos, guarda todo---*/
                users[req.session.user.id -1].firstName = req.body.firstName
                users[req.session.user.id -1].lastName = req.body.lastName
                users[req.session.user.id -1].password = bcryptjs.hashSync(req.body.password, 10);
                users[req.session.user.id -1].email = req.body.email 

                passwordConfirmation = true;
                console.log(passwordConfirmation);

                /*---Chequea si el Admin Code es correcto, para hacer a ese usuario administrador del sitio---*/
                if (req.body.adminCode == "sarasa.20") {
                    users[req.session.user.id -1].adminCode = true;
                } else if (req.body.adminCode != "") {
                    users[req.session.user.id -1].adminCode = false;
                }
                /*-----Guardamos datos en el users.json-----*/
                const usersJSON = JSON.stringify(users);
                fs.writeFileSync(usersDir, usersJSON);

                res.render('./users/profile', {passwordConfirmation : passwordConfirmation});

            } else if (!errors.isEmpty()) { 
                    /*---Si el UNICO error es de la contraseña vacia, guarda los demás datos, pero NO actualiza password---*/
                    if (req.body.passwordRepeat == '' && errors.errors.length == 1) {
                        users[req.session.user.id -1].firstName = req.body.firstName
                        users[req.session.user.id -1].lastName = req.body.lastName
                        users[req.session.user.id -1].email = req.body.email 

                        /*---Chequea si el Admin Code es correcto, para hacer a ese usuario administrador del sitio---*/
                        if (req.body.adminCode == "sarasa.20") {
                        users[req.session.user.id -1].adminCode = true;
                        } else if (req.body.adminCode != "") {
                        users[req.session.user.id -1].adminCode = false;
                        }
                        /*-----Guardamos datos en el users.json-----*/
                        const usersJSON = JSON.stringify(users);
                        fs.writeFileSync(usersDir, usersJSON);
                        
                        res.redirect('/users/profile/');

                    /*---Si hay varios errores redirige mostrandolos---*/
                    } else {
                        return res.render('./users/profile', {errors: errors.errors});
                        }
                    
                } 
                    
    },
    photoUpdate: function (req, res, next) {
        /*---Aqui se guarda el nombre del archivo del nuevo avatar---*/
        users[req.session.user.id -1].image = req.files[0].filename;

        const usersJSON = JSON.stringify(users);
		fs.writeFileSync(usersDir, usersJSON);

        res.redirect('/users/profile/')
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
        users.splice(req.session.user.id -1, 1)
         /*---Aquí se corrigen los ID de los usuarios restantes para evitar errores----*/
        for(let i=0; i < users.length; i++){
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