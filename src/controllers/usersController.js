const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { localsName } = require('ejs');
const session = require('express-session');
const db = require('../database/models');

const usersDir = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersDir, 'utf-8'));
const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');
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
        db.User.findOne({
            where: {
                email: req.body.user
            }
        }).then((user) => {
                if (user != null) {
                    var check = bcryptjs.compareSync(req.body.password, user.password);
                        if (check) {

                            req.session.user = user;
                            
                            if(req.body.remember != undefined ) {
                                res.cookie('recordame', user.hash_id, {maxAge: 1000*60*60*24})
                            } 
        
                            return res.redirect('/users/profile');
                                                
                        } else if (!check) {
                            
                            return res.render('./users/login', {loginPassValue: false, loginMailValue: null, email: user.email});
                        }     
                } else {
        
                    return res.render('./users/login', {loginPassValue: null, loginMailValue: false, email: req.body.user});
                }
            })
            .catch((err) => {
                let ErrorsJSON = JSON.stringify(err);
                fs.appendFileSync(ErrorsDir, ErrorsJSON);
            })    
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
            
            db.User.create({
                hash_id: bcryptjs.hashSync("user name " + req.body.firstName, 10),
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password:  bcryptjs.hashSync(req.body.password, 10),
                adminCode: 'user'
            }).then(result => {
                req.session.user = result.id
            })

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
                
        /*---Se chequean los inputs. Si no hay errores los guarda---*/
        if (errors.isEmpty()) {
            /*---Si NO hay errores en los campos, guarda todo---*/
            db.User.update({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password:  req.body.password,
            }, {
                where: {
                id: {[db.Sequelize.Op.like] : [req.session.user.id]}
            }})

            passwordConfirmation = true;

            /*---Chequea si el Admin Code es correcto, para hacer a ese usuario administrador del sitio---*/
            if (req.body.adminCode == "sarasa.20") {
                db.User.update({
                    role: 'admin'
                }, {
                    where: {
                    id: {[db.Sequelize.Op.like] : [req.session.user.id]}
                }})
            } else if (req.body.adminCode != "") {
                db.User.update({
                    role: 'user'
                }, {
                    where: {
                    id: {[db.Sequelize.Op.like] : [req.session.user.id]}
                }})
            }

            res.render('./users/profile', {passwordConfirmation : passwordConfirmation});

        }   else if (!errors.isEmpty()) { 
                /*---Si el UNICO error es de la contraseña vacia, guarda los demás datos, pero NO actualiza password---*/
                db.User.update({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                }, {
                    where: {
                    id: {[db.Sequelize.Op.like] : [req.session.user.id]}
                }})

                /*---Chequea si el Admin Code es correcto, para hacer a ese usuario administrador del sitio---*/
                if (req.body.adminCode == "sarasa.20") {
                    db.User.update({
                        role: 'admin'
                    }, {
                        where: {
                        id: {[db.Sequelize.Op.like] : [req.session.user.id]}
                    }})
                    } else if (req.body.adminCode != "") {
                        db.User.update({
                            role: 'user'
                        }, {
                            where: {
                            id: {[db.Sequelize.Op.like] : [req.session.user.id]}
                        }})
                    }
                        
                        res.redirect('/users/profile/');

                    /*---Si hay varios errores redirige mostrandolos---*/
            } else {
                return res.render('./users/profile', {errors: errors.errors});
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