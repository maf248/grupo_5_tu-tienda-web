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

                    return res.render('./users/login', {loginPassValue: false, loginMailValue: null});
                } 

        } else {

            return res.render('./users/login', {loginPassValue: null, loginMailValue: false});
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

                    return res.render('./users/register', {mailDuplicated: true});
                }
            });
            if (req.body.password !== req.body.passwordRepeat) {

                return res.render('./users/register', {passwordsNotMatch: true});

            } else if (!mailDuplicated) {       
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
        let errors = validationResult(req);
        let mailDuplicated = false;
                
        /*---Se chequean los inputs. Si no hay errores los guarda---*/

        if (errors.isEmpty()) {
            /*---Si las contraseñas coinciden se guarda, sino se avisa del error---*/
            if (req.body.password !== req.body.passwordRepeat) {
                return res.render('./users/profile', {passwordsNotMatch: true});
            } else {
                users[req.params.id -1].firstName = req.body.firstName
                users[req.params.id -1].lastName = req.body.lastName
                users[req.params.id -1].password = bcryptjs.hashSync(req.body.password, 10);
                /*---Chequea el email, que no esté en uso por otro usuario---*/
                users.forEach(user => {
                    if (user.email == req.body.email) {
                        if (user.id != req.session.user.id) {
                            mailDuplicated = true;
                            return res.render('./users/profile', {mailDuplicated: true});
                        }
                    }
                });
                console.log(mailDuplicated);
                if (!mailDuplicated) {
                    users[req.params.id -1].email = req.body.email 
                }
                /*-----Guardamos datos en el users.json-----*/
                const usersJSON = JSON.stringify(users);
                fs.writeFileSync(usersDir, usersJSON);
                res.redirect('/users/profile/'+ req.params.id);
            }


        } else if (!errors.isEmpty()) { 
                    /*---Si el UNICO error es de la contraseña vacia, guarda los demás datos---*/
                    if (req.body.password == '' && errors.errors.length == 1) {
                        users[req.params.id -1].firstName = req.body.firstName
                        users[req.params.id -1].lastName = req.body.lastName
                    /*---Chequea el email, que no esté en uso por otro usuario---*/
                    mailDuplicated = false;
                    users.forEach(user => {
                        if (user.email == req.body.email) {
                            if (user.id != req.session.user.id) {
                                mailDuplicated = true;
                                return res.render('./users/profile', {mailDuplicated: true});
                            }
                        }
                    });
                    if (!mailDuplicated) {
                        users[req.params.id -1].email = req.body.email 
                    }
                    /*-----Guardamos datos en el users.json-----*/
                    const usersJSON = JSON.stringify(users);
                    fs.writeFileSync(usersDir, usersJSON);
                    
                    res.redirect('/users/profile/'+ req.params.id);
                } else {
                    return res.render('./users/profile', {errors: errors.errors});
                }
        }
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