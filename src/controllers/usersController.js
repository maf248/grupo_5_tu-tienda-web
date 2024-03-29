const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { localsName } = require('ejs');
const session = require('express-session');
const db = require('../database/models');

const ErrorsDir = path.join(__dirname, '..', 'data', 'catchErrorsLog.json');
var loginMailValue = null;
var loginPassValue = null;

const usersController = {
    login: function(req, res, next) {
        if (req.session.user != undefined) {
            res.redirect('/users/profile');
         } else {
            res.render('./users/login');
            }
        },
    validate: function(req, res, next) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.findOne({
                where: {
                    email: req.body.user
                }
            }).then((user) => {
                req.session.user = user;
                if(req.body.remember != undefined ) {
                        res.cookie('recordame', user.hash_id, {maxAge: 1000*60*60*24})
                } 
        
                return res.redirect('/users/profile');
                                                
            }).catch(err => console.log(err))
                
        } else {        
                return res.render('./users/login', {errors: errors.errors, email: req.body.user});
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

            db.User.create({
                hash_id: bcryptjs.hashSync("user name " + req.body.firstName, 10),
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password:  bcryptjs.hashSync(req.body.password, 10),
                role: 'user'
            }).then( value => {

                req.session.user = value;
                res.redirect('/users/profile');
            }).catch(err => console.log(err))

        }
    
    },
    profile: function (req, res, next) {
        if (req.session.user != undefined) {

            db.User.findByPk(req.session.user.id,
                {include: [{
                    association: "Products"
                },
                {
                    association: "Categories"
                }
            ]}).then(user => { 
                  res.render('./users/profile', {user: user});
                }).catch(err => console.log(err))

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
                password:  bcryptjs.hashSync(req.body.password, 10),
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
                .then(() => {
                    db.User.findByPk(req.session.user.id)
                    .then((value) => {
            
                        delete req.session.user;
                        req.session.user = value;

                        res.redirect('/users/profile/');
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
                
    
            } else if (req.body.adminCode != "") {
                db.User.update({
                    role: 'user'
                }, {
                    where: {
                    id: {[db.Sequelize.Op.like] : [req.session.user.id]}
                }})
                .then(() => {
                    db.User.findByPk(req.session.user.id)
                    .then((value) => {
            
                        delete req.session.user;
                        req.session.user = value;

                        res.redirect('/users/profile/');
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
                
    
            }

            res.render('./users/profile', {passwordConfirmation : passwordConfirmation});

            /*---Si el UNICO error es de la contraseña vacia, guarda los demás datos, pero NO actualiza password---*/
        }   else if (errors.errors.length >= 1 && req.body.passwordRepeat == '') { 
                
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
                    .then(() => {
                        db.User.findByPk(req.session.user.id)
                        .then((value) => {
                
                            delete req.session.user;
                            req.session.user = value;

                            res.redirect('/users/profile/');
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
        
                } else if (req.body.adminCode != "") {
                        db.User.update({
                            role: 'user'
                        }, {
                            where: {
                            id: {[db.Sequelize.Op.like] : [req.session.user.id]}
                        }})
                        .then(() => {
                            db.User.findByPk(req.session.user.id)
                            .then((value) => {
                    
                                delete req.session.user;
                                req.session.user = value;

                                res.redirect('/users/profile/');
                            })
                            .catch(err => {
                                console.log(err)
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                               
                }
                
         
                /*---Si hay varios errores redirige mostrandolos---*/
        } else {

            return res.render('./users/profile', {errors: errors.errors});
        }                    
    },
    photoUpdate: function (req, res, next) {
        /*---Aqui se guarda el nombre del archivo del nuevo avatar---*/
        db.User.update({
            image: req.file.filename
        }, {
            where: {
                id: {[db.Sequelize.Op.like] : [req.session.user.id]}
            }
        }).then( value => {
            res.redirect('/users/profile')
        }).catch(err => console.log(err))
    },
    logout: function (req, res, next) {
        /*---Aqui se resetean valores de mensajes de error----*/
        loginMailValue = null;
        loginPassValue = null;
        /*---Aqui se borra la cookie, luego se cierra la session----*/
        res.cookie('recordame', '', {maxAge: 0});

        req.session.destroy();

        res.redirect('/');
    },
    delete: function(req, res, next){
        /*---Aquí se borra el usuario de la base de datos, utilizando soft-delete----*/
        db.User.destroy({where: {id: {[db.Sequelize.Op.like] : [req.session.user.id]} }})
        
        /*---Aquí se resetean valores de mensajes, se borra la cookie y se cierra session----*/
        loginMailValue = null;
        loginPassValue = null;

        res.cookie('recordame', '', {maxAge: 0});

        delete req.session.user;
        /*---Finalmente se redirije a inicio----*/
        res.redirect('/');
    }
}

module.exports = usersController;