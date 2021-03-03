const fs = require('fs');
const path = require('path');
const {
    Recoverable
} = require('repl');
const {
    isContext
} = require('vm');
const {
    validationResult
} = require('express-validator');

const db = require('../database/models');

/*----- Acá generamos un indice alfabetico de Benefits para luego utilizar al iterar los beneficios A, B, C....etc -----*/
const indexBenefits = "abcdefghijklmnopqrstuvwx";

/*----Acá creamos un objeto que guardará el nombre de archivo subido, correspondiente a cada input----*/
var imageDir = {}
/*----Funcion que filtra archivos subidos, para que cada nombre de archivo se guarde en donde corresponde. Recibe como parametro req.files----*/
function uploadFilesDir(files) {
    imageDir = {}
    files.forEach(file => {
        switch (file.fieldname) {
            case 'image':
                imageDir.image = file.filename
                break
            case 'categoryImage1':
                imageDir.categoryImage1 = file.filename
                break
            case 'categoryImage2':
                imageDir.categoryImage2 = file.filename
                break
            case 'categoryImage3':
                imageDir.categoryImage3 = file.filename
                break
            case 'sectionImage':
                imageDir.sectionImage = file.filename
                break
            case 'editSectionImage':
                imageDir.editSectionImage = file.filename
                break
            case 'contentIcon':
                imageDir.contentIcon = file.filename
                break
            case 'editedContent':
                imageDir.editedContent = file.filename
                break
        }
    });
};

const productosController = {
    detalle: function (req, res, next) {
        /*-----Acá pasamos la vista de producto según  el id -----*/
        db.Product.findByPk(req.params.id, {
                include: [{
                        association: "Sections",
                        include: [{
                            association: "Contents"
                        }]
                    },
                    {
                        association: "Categories"
                    }
                ]
            })
            .then((product) => {
                db.Benefit.findAll({
                        include: [{
                            association: "Categories",
                            where: {
                                id: [product.Categories[0].id, product.Categories[1].id, product.Categories[2].id]
                            }
                        }]
                    })
                    .then(benefits => {
                        res.render('./products/producto', {
                            product: product,
                            benefits: benefits
                        });
                    })

            })
            .catch(err => {
                res.send(err)
            })
    },
    listado: function (req, res, next) {
        db.Product.findAll({
                include: [{
                    association: "Categories"
                }]
            })
            .then((products) => {
                res.render('./products/listado-productos', {
                    products: products
                });
            })
            .catch(err => {
                res.send(err)
            })

    },
    createProduct: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {
            res.render('./products/create-edit/product');
        } else {
            res.redirect('/users/login')
        }
    },
    saveProduct: function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

            uploadFilesDir(req.files);

            db.Product.create({
                    name: req.body.name,
                    type: req.body.type,
                    title_banner: req.body.titleBanner1,
                    subtitle_banner: req.body.subtitleBanner1,
                    image: imageDir.image
                })
                .then(newProduct => {

                    res.redirect(`/products/${newProduct.id}/create/categories`);
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            res.render('./products/create-edit/product', {
                errors: errors.errors,
                body: req.body
            });
        }


    },
    createCategory: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {
            res.render('./products/create-edit/categories', {
                newID: req.params.id
            });
        } else {
            res.redirect('/users/login')
        }
    },
    saveCategories: function (req, res, next) {
        uploadFilesDir(req.files);

        db.Category.bulkCreate([{
                name: req.body.category1,
                image: imageDir.categoryImage1,
                price: Number(req.body.price[0]),
                transaction_cost_percent: req.body.costoTransaccion[1],
                web_sections: req.body.cantidadSecciones1
            }, {
                name: req.body.category2,
                image: imageDir.categoryImage2,
                price: Number(req.body.price[1]),
                transaction_cost_percent: req.body.costoTransaccion[2],
                web_sections: req.body.cantidadSecciones2
            }, {
                name: req.body.category3,
                image: imageDir.categoryImage3,
                price: Number(req.body.price[2]),
                transaction_cost_percent: req.body.costoTransaccion[3],
                web_sections: req.body.cantidadSecciones3
            }])
            .then(newCategories => {
                /*----Acá se asocian las categorias nuevas al producto nuevo----*/
                for (let newCategory of newCategories) {
                    newCategory.addProducts(req.params.id);
                }
                res.redirect(`/products/${req.params.id}/create/benefits`);
            })
            .catch(err => {
                res.send(err)
            })
    },
    createBenefits: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {

            db.Product.findByPk(req.params.id, {
                    include: [{
                        association: "Categories"
                    }]
                })
                .then(product => {
                    db.Benefit.findAll({
                            include: [{
                                association: "Categories",
                                where: {
                                    id: [product.Categories[0].id, product.Categories[1].id, product.Categories[2].id]
                                }
                            }]
                        })
                        .then(benefits => {
                            res.render('./products/create-edit/benefits', {
                                benefits: benefits,
                                product: product,
                                newID: req.params.id
                            });
                        })

                })

        } else {
            res.redirect('/users/login')
        }
    },
    saveBenefits: function (req, res, next) {
        //Guarda los nuevos beneficios y las asocia (a las categorias)
        if (req.body.newBenefitName != '') {

            db.Benefit.create({
                name: req.body.newBenefitName
            }).then(newBenefit => {

                db.Product.findByPk(req.params.id, {
                        include: [{
                            association: "Categories"
                        }]
                    })
                    .then(product => {
                        if (req.body.newBenefitCat1 == 'true') {
                            newBenefit.addCategories(product.Categories[0].id);
                        }
                        if (req.body.newBenefitCat2 == 'true') {
                            newBenefit.addCategories(product.Categories[1].id);
                        }
                        if (req.body.newBenefitCat3 == 'true') {
                            newBenefit.addCategories(product.Categories[2].id);
                        }

                        res.redirect(`/products/${req.params.id}/create/benefits`);
                    })


            })

        }

    },
    createSections: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {

            db.Section.findAll({
                    where: {
                        product_id: req.params.id
                    }
                }).then(section => {
                    res.render('./products/create-edit/sections', {
                        newID: req.params.id,
                        section: section
                    });
                })
                .catch(err => console.log(err))
        } else {
            res.redirect('/users/login')
        }
    },
    saveSections: function (req, res, next) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            uploadFilesDir(req.files);

            db.Section.create({

                product_id: req.params.id,
                title: req.body.sectionTitle,
                image: imageDir.sectionImage

            }).then(() => {

                res.redirect(`/products/${req.params.id}/create/sections`)

            }).catch((err) => {
                console.log(err)
            })
        } else {

            db.Section.findAll({
                where: {
                    product_id: req.params.id
                }
            }).then(section => {
                res.render('./products/create-edit/sections', {
                    newID: req.params.id,
                    section: section,
                    errors: errors.errors,
                    body: req.body
                });
            })
            .catch(err => console.log(err))
        }

    },
    createContents: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {

            db.Section.findAll({
                    where: {
                        product_id: req.params.id
                    }
                })
                .then(section => {

                    res.render('./products/create-edit/contents', {
                        newID: req.params.id,
                        section: section
                    });

                }).catch(err => console.log(err))
        } else {
            res.redirect('/users/login')
        }
    },
    showSectionIdForContentsCreation: function (req, res, next) {

        db.Product.findByPk(req.params.id, {
                include: [{
                    association: "Sections",
                    include: [{
                        association: "Contents"
                    }]
                }]
            })

            .then(product => {
                db.Section.findByPk(req.params.section, {
                    include: [{
                        association: "Contents"
                    }]
                }).then(sec => {
                    res.render('./products/create-edit/contents', {
                        productToCreate: product,
                        sectionToCreate: sec
                    });
                })
            })
            .catch(err => console.log(err))

    },
    saveContents: function (req, res, next) {

        uploadFilesDir(req.files);

        db.Section.findByPk(req.params.section, {
                include: [{
                    association: "Contents"
                }]
            })
            .then(section => {
                if (section.Contents.length < 12) {
                    db.Content.bulkCreate([{
                            section_id: req.params.section,
                            type: "icon",
                            text: imageDir.contentIcon,
                        },
                        {
                            section_id: req.params.section,
                            type: "subtitle",
                            text: req.body.contentSubtitle,
                        },
                        {
                            section_id: req.params.section,
                            type: "description",
                            text: req.body.contentDescription,
                        }
                    ]).then(() => {
                        res.redirect(`/products/${req.params.id}/create/contents/${req.params.section}`)
                    })
                } else {
                    res.redirect(`/products/${req.params.id}/create/contents`)
                }
            })
    },
    editProduct: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {
            db.Product.findByPk(req.params.id)
                .then(product => {
                    res.render('./products/create-edit/product', {
                        productToEdit: product
                    });
                })

        } else {
            res.redirect('/users/login')
        }
    },
    modifyProduct: function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            uploadFilesDir(req.files);
            /*----Actualizando los datos del producto en la base de datos----*/
            db.Product.update({
                    name: req.body.name,
                    type: req.body.type,
                    title_banner: req.body.titleBanner1,
                    subtitle_banner: req.body.subtitleBanner1,
                    image: imageDir.image
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => {
                    res.redirect(`/products/${req.params.id}/edit/categories`);
                })
                .catch((error) => {
                    console.log(error);
                    let ErrorsJSON = JSON.stringify(error);
                    fs.appendFileSync(ErrorsDir, ErrorsJSON);
                })
        } else {
            db.Product.findByPk(req.params.id)
                .then(product => {
                    res.render('./products/create-edit/product', {
                        productToEdit: product,
                        errors: errors.errors,
                        body: req.body
                    });
                })
        }
    },
    editCategories: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {
            db.Product.findByPk(req.params.id, {
                    include: [{
                            association: "Sections",
                            include: [{
                                association: "Contents"
                            }]
                        },
                        {
                            association: "Categories",
                            include: [{
                                association: "Benefits"
                            }]
                        }
                    ]
                })
                .then(product => {
                    res.render('./products/create-edit/categories', {
                        productToEdit: product
                    });
                })

        } else {
            res.redirect('/users/login')
        }
    },
    modifyCategories: function (req, res, next) {
        uploadFilesDir(req.files);
        /*----Se buscan las categorias asociadas, para luego actualizar dicha información----*/
        db.Category.findAll({
                include: [{
                    association: "Products",
                    where: {
                        id: req.params.id
                    }
                }]
            }).then(associatedCategories => {

                /*----Se actualizan las categorías asociadas a dicho producto----*/
                db.Category.update({
                    name: req.body.category1,
                    image: imageDir.categoryImage1,
                    price: Number(req.body.price[0]),
                    transaction_cost_percent: req.body.costoTransaccion[1],
                    web_sections: req.body.cantidadSecciones1

                }, {
                    where: {
                        id: associatedCategories[0].id
                    }
                });

                db.Category.update({
                    name: req.body.category2,
                    image: imageDir.categoryImage2,
                    price: Number(req.body.price[1]),
                    transaction_cost_percent: req.body.costoTransaccion[2],
                    web_sections: req.body.cantidadSecciones2

                }, {
                    where: {
                        id: associatedCategories[1].id
                    }
                });

                db.Category.update({
                    name: req.body.category3,
                    image: imageDir.categoryImage3,
                    price: Number(req.body.price[2]),
                    transaction_cost_percent: req.body.costoTransaccion[3],
                    web_sections: req.body.cantidadSecciones3

                }, {
                    where: {
                        id: associatedCategories[2].id
                    }
                });

            })
            .then(() => {
                res.redirect(`/products/${req.params.id}/edit/benefits`);
            })
            .catch((error) => {
                console.log(error);
                let ErrorsJSON = JSON.stringify(error);
                fs.appendFileSync(ErrorsDir, ErrorsJSON);
            })
    },
    editBenefits: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {

            db.Product.findByPk(req.params.id, {
                    include: [{
                        association: "Categories"
                    }]
                })
                .then(product => {
                    db.Benefit.findAll({
                            include: [{
                                association: "Categories",
                                where: {
                                    id: [product.Categories[0].id, product.Categories[1].id, product.Categories[2].id]
                                }
                            }]
                        })
                        .then(benefits => {
                            res.render('./products/create-edit/benefits', {
                                benefits: benefits,
                                product: product
                            });
                        })

                })

        } else {
            res.redirect('/users/login')
        }
    },
    modifyBenefits: function (req, res, next) {
        db.Product.findByPk(req.params.id, {
                include: [{
                    association: "Categories"
                }]
            })
            .then(product => {
                db.Benefit.findAll({
                        include: [{
                            association: "Categories",
                            where: {
                                id: [product.Categories[0].id, product.Categories[1].id, product.Categories[2].id]
                            }
                        }]
                    })
                    .then(associatedBenefits => {
                        /*----Recorre los beneficios, y actualiza los nombres----*/
                        for (let i = 0; i < associatedBenefits.length; i++) {
                            /*----Si el nombre del beneficio NO es un string vacío, se actualiza dicho beneficio----*/
                            if (typeof req.body['benefit' + associatedBenefits[i].id + 'Name'] != 'undefined' && req.body['benefit' + associatedBenefits[i].id + 'Name'] != '') {
                                /*---Guarda los cambios en el nombre de beneficio----*/
                                db.Benefit.update({
                                    name: req.body['benefit' + associatedBenefits[i].id + 'Name']
                                }, {
                                    where: {
                                        id: associatedBenefits[i].id
                                    }
                                })

                                /*----Si el nombre del beneficio es un string vacío, se borra dicho beneficio----*/
                            } else if (typeof req.body['benefit' + associatedBenefits[i].id + 'Name'] != 'undefined' && req.body['benefit' + associatedBenefits[i].id + 'Name'] == '') {

                                db.Benefit.destroy({
                                    where: {
                                        id: {
                                            [db.Sequelize.Op.like]: [associatedBenefits[i].id]
                                        }
                                    }
                                })
                            }
                            /*----Recorre las categorías y chequea las asociaciones con los beneficios en cuestion----*/
                            if (associatedBenefits[i].Categories) {

                                associatedBenefits[i].Categories.forEach(asociatedCategory => {

                                    /*--Si esta tildado el checkbox de categoría 1, lo asocia en caso de NO estarlo--*/
                                    if (req.body['benefit' + associatedBenefits[i].id + 'Cat1'] == 'true') {

                                        if (product.Categories[0].id != asociatedCategory.id) {
                                            associatedBenefits[i].addCategories(product.Categories[0].id)
                                        }
                                        /*----Si NO esta tildado el checkbox de categoría 1, pero sí esta asociado con esa categoría, lo desasocia---*/
                                    } else {
                                        if (product.Categories[0].id == asociatedCategory.id) {
                                            associatedBenefits[i].removeCategories(product.Categories[0].id)
                                        }
                                    }
                                    /*--Si esta tildado el checkbox de categoría 2, lo asocia en caso de NO estarlo--*/
                                    if (req.body['benefit' + associatedBenefits[i].id + 'Cat2'] == 'true') {

                                        if (product.Categories[1].id != asociatedCategory.id) {
                                            associatedBenefits[i].addCategories(product.Categories[1].id)
                                        }
                                        /*----Si NO esta tildado el checkbox de categoría 2, pero sí esta asociado con esa categoría, lo desasocia---*/
                                    } else {
                                        if (product.Categories[1].id == asociatedCategory.id) {
                                            associatedBenefits[i].removeCategories(product.Categories[1].id)
                                        }
                                    }
                                    /*--Si esta tildado el checkbox de categoría 3, lo asocia en caso de NO estarlo--*/
                                    if (req.body['benefit' + associatedBenefits[i].id + 'Cat3'] == 'true') {

                                        if (product.Categories[2].id != asociatedCategory.id) {
                                            associatedBenefits[i].addCategories(product.Categories[2].id)
                                        }
                                        /*----Si NO esta tildado el checkbox de categoría 3, pero sí esta asociado con esa categoría, lo desasocia---*/
                                    } else {
                                        if (product.Categories[2].id == asociatedCategory.id) {
                                            associatedBenefits[i].removeCategories(product.Categories[2].id)
                                        }
                                    }

                                })
                            }

                        }

                        res.redirect(`/products/${product.id}`)
                    })

            })
    },
    editSections: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {
            db.Product.findByPk(req.params.id, {
                    include: [{
                            association: "Sections",
                            include: [{
                                association: "Contents"
                            }]
                        },
                        {
                            association: "Categories",
                            include: [{
                                association: "Benefits"
                            }]
                        }
                    ]
                })
                .then(product => {
                    res.render('./products/create-edit/sections', {
                        productToEdit: product
                    });
                })
        } else {
            res.redirect('/users/login')
        }
    },
    showSection: function (req, res, next) {

        db.Product.findByPk(req.params.id, {
                include: [{
                    association: "Sections"
                }]
            })
            .then(product => {
                db.Section.findByPk(req.params.section).then(sec => {
                    res.render('./products/create-edit/sections', {
                        productToEdit: product,
                        sectionToEdit: sec
                    });
                })
            })
            .catch(err => console.log(err))

    },
    modifySection: function (req, res, next) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            uploadFilesDir(req.files);

            db.Section.update({
                title: req.body.sectionTitle,
                image: imageDir.sectionImage
            }, {
                where: {
                    id: req.params.section
                }
            }).then( () => {
                res.redirect(`/products/${req.params.id}/edit/sections/${req.params.section}`)
            })
            } else {
                db.Product.findByPk(req.params.id, {
                    include: [{
                        association: "Sections"
                    }]
                })
                .then(product => {
                    db.Section.findByPk(req.params.section)
                    .then((sec) => {
                        res.render('./products/create-edit/sections', {
                            productToEdit: product,
                            sectionToEdit: sec,
                            errors: errors.errors,
                            body: req.body
                        });
                    }).catch(err => console.log(err))
                })
        }
    },
    editContents: function (req, res, next) {
        if (req.session.user != undefined && req.session.user.role == 'admin') {
            db.Product.findByPk(req.params.id, {
                    include: [{
                        association: "Sections",
                        include: [{
                            association: "Contents"
                        }]
                    }]
                })
                .then(product => {
                    res.render('./products/create-edit/contents', {
                        productToEdit: product
                    });
                }).catch(err => console.log(err))
        } else {
            res.redirect('/users/login')
        }
    },
    showSectionIdForContentEdition: function (req, res, next) {
        db.Product.findByPk(req.params.id)
            .then(product => {
                db.Section.findByPk(req.params.section, {
                    include: [{
                        association: "Contents"
                    }]
                }).then(section => {
                    res.render('./products/create-edit/contents', {
                        productToEdit: product,
                        sectionToEdit: section
                    })
                })
            }).catch(err => console.log(err))
    },
    modifyContents: function (req, res, next) {

        if (typeof req.body.editedContent === 'string') {

            db.Content.update({
                section_id: req.params.section,
                type: req.params.type,
                text: req.body.editedContent
            }, {
                where: {
                    id: req.params.content
                }
            }).then(() => {
                res.redirect(`/products/${req.params.id}/edit/contents/${req.params.section}`)
            }).catch(err => console.log(err))
        } else {
            uploadFilesDir(req.files);
            db.Content.update({
                section_id: req.params.section,
                type: req.params.type,
                text: imageDir.editedContent
            }, {
                where: {
                    id: req.params.content
                }
            }).then(() => {
                res.redirect(`/products/${req.params.id}/edit/contents/${req.params.section}`)
            }).catch(err => console.log(err))
        }
    },
    borrado: function (req, res, next) {
        /*----Borrando la fila del producto en la base de datos (soft-delete)----*/
        db.Product.destroy({
            where: {
                id: {
                    [db.Sequelize.Op.like]: [req.params.id]
                }
            }
        })

        res.redirect('/products');
    }
}
module.exports = productosController;