const fs = require('fs');
const path = require('path');
const { Recoverable } = require('repl');
const { isContext } = require('vm');

const db = require('../database/models');

/*----- Acá generamos un indice alfabetico de Benefits para luego utilizar al iterar los beneficios A, B, C....etc -----*/
const indexBenefits = "abcdefghijklmnopqrstuvwx";

/*----Acá creamos un objeto que guardará el nombre de archivo subido, correspondiente a cada input----*/
var imageDir = {}
/*----Funcion que filtra archivos subidos, para que cada nombre de archivo se guarde en donde corresponde. Recibe como parametro req.files----*/
function uploadFilesDir(files) {
  imageDir = {}
files.forEach (file => {
  switch (file.fieldname) {
    case 'image': imageDir.image = file.filename
    break
    case 'aicon1': imageDir.aicon1 = file.filename
    break
    case 'aicon2': imageDir.aicon2 = file.filename
    break
    case 'aicon3': imageDir.aicon3 = file.filename
    break
    case 'aicon4': imageDir.aicon4 = file.filename
    break
    case 'aimage': imageDir.aimage = file.filename
    break
    case 'bimage': imageDir.bimage = file.filename
    break
    case 'bicon1': imageDir.bicon1 = file.filename
    break
    case 'bicon2': imageDir.bicon2 = file.filename
    break
    case 'bicon3': imageDir.bicon3 = file.filename
    break
    case 'bicon4': imageDir.bicon4 = file.filename
    break
    case 'cicon1': imageDir.cicon1 = file.filename
    break
    case 'cicon2': imageDir.cicon2 = file.filename
    break
    case 'cicon3': imageDir.cicon3 = file.filename
    break
    case 'cicon4': imageDir.cicon4 = file.filename
    break
    case 'cimage': imageDir.cimage = file.filename
    break
    case 'dimage': imageDir.dimage = file.filename
    break
    case 'dicon1': imageDir.dicon1 = file.filename
    break
    case 'dicon2': imageDir.dicon2 = file.filename
    break
    case 'dicon3': imageDir.dicon3 = file.filename
    break
    case 'dicon4': imageDir.dicon4 = file.filename
    break
    case 'eicon1': imageDir.eicon1 = file.filename
    break
    case 'eicon2': imageDir.eicon2 = file.filename
    break
    case 'eicon3': imageDir.eicon3 = file.filename
    break
    case 'eicon4': imageDir.eicon4 = file.filename
    break
    case 'eimage': imageDir.eimage = file.filename
    break
    case 'categoryImage1': imageDir.categoryImage1 = file.filename
    break
    case 'categoryImage2': imageDir.categoryImage2 = file.filename
    break
    case 'categoryImage3': imageDir.categoryImage3 = file.filename
    break
  }
});
};

const productosController = {
    detalle: function(req, res, next) {
        /*-----Acá pasamos la vista de producto según  el id -----*/
          db.Product.findByPk(req.params.id, {
            include: [
              {association: "Sections", 
            include: [{association: "Contents"}]},
              {association: "Categories",
            include: [
              {association: "Benefits"}
            ]
          }
            ]
          })
          .then((product) => {
          
            res.render('./products/producto', {product: product});
          })
          .catch(err => {
            res.send(err)
          })
          
    },
    listado: function(req, res, next) {
          db.Product.findAll({
            include: [
              {association: "Categories"}
            ]
          })
          .then((products) => {
            res.render('./products/listado-productos', {products: products});
          })
          .catch(err => {
            res.send(err)
          })
 
        },
    createProduct: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
            res.render('./products/create-edit/product'); 
          } else {
            res.redirect('/users/login')
          }
        },
      saveProduct: function (req, res, next) {
        uploadFilesDir(req.files);

        db.Product.create({
          name: req.body.name,
          type: req.body.type,
          title_banner: req.body.titleBanner1,
          subtitle_banner: req.body.subtitleBanner1,
          image: imageDir.image
        })
        .then(newProduct => {
          res.redirect('/products/create/categories')
        })
        .catch(err => {
          res.send(err)
        })
      },
     createCategory: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
            res.render('./products/create-edit/categories'); 
          } else {
            res.redirect('/users/login')
          }
        },
      createBenefits: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
            res.render('./products/create-edit/benefits', {indexBenefits: indexBenefits}); 
          } else {
            res.redirect('/users/login')
          }
        },
      createSections: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
            res.render('./products/create-edit/sections'); 
          } else {
            res.redirect('/users/login')
          }
        },
      createContents: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
            res.render('./products/create-edit/contents'); 
          } else {
            res.redirect('/users/login')
          }
        },
  
    creador: function(req, res, next) {
      /*----Acá llamamos a la funcion creada, para que al recibir los archivos subidos, guarde sus nombres en imageDir----*/
      uploadFilesDir(req.files);


       /*----Acá guardamos toda la información del producto nuevo----*/
       db.Product.create({
          name: req.body.name,
          type: req.body.type,
          title_banner: req.body.titleBanner1,
          subtitle_banner: req.body.subtitleBanner1,
          image: imageDir.image
        }).then(newProduct => {

          /*----Acá guardamos toda la información de las secciones de dicho producto----*/
              db.Section.create({
              product_id: newProduct.id,
              title: req.body.atitle,
              image: imageDir.aimage,
              }).then(newSection => {
                db.Content.bulkCreate([{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.aicon1
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.asubtitle1
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.adescription1
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.aicon2
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.asubtitle2
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.adescription2
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.aicon3
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.asubtitle3
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.adescription3
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.aicon4
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.asubtitle4
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.adescription4
                }])
              })
              db.Section.create({
              product_id: newProduct.id,
              title: req.body.btitle,
              image: imageDir.bimage,
              }).then(newSection => {
                db.Content.bulkCreate([{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.bicon1
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.bsubtitle1
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.bdescription1
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.bicon2
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.bsubtitle2
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.bdescription2
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.bicon3
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.bsubtitle3
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.bdescription3
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.bicon4
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.bsubtitle4
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.bdescription4
                }])
              })
              db.Section.create({
              product_id: newProduct.id,
              title: req.body.ctitle,
              image: imageDir.cimage,
              }).then(newSection => {
                db.Content.bulkCreate([{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.cicon1
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.csubtitle1
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.cdescription1
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.cicon2
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.csubtitle2
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.cdescription2
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.cicon3
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.csubtitle3
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.cdescription3
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.cicon4
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.csubtitle4
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.cdescription4
                }])
              })
              db.Section.create({
              product_id: newProduct.id,
              title: req.body.dtitle,
              image: imageDir.dimage,
              }).then(newSection => {
                db.Content.bulkCreate([{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.dicon1
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.dsubtitle1
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.ddescription1
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.dicon2
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.dsubtitle2
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.ddescription2
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.dicon3
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.dsubtitle3
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.ddescription3
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.dicon4
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.dsubtitle4
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.ddescription4
                }])
              })
              db.Section.create({
              product_id: newProduct.id,
              title: req.body.etitle,
              image: imageDir.eimage,
              }).then(newSection => {
                db.Content.bulkCreate([{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.eicon1
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.esubtitle1
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.edescription1
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.eicon2
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.esubtitle2
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.edescription2
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.eicon3
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.esubtitle3
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.edescription3
                },{
                  section_id: newSection.id,
                  type: "icon",
                  text: imageDir.eicon4
                },{
                  section_id: newSection.id,
                  type: "subtitle",
                  text: req.body.esubtitle4
                },{
                  section_id: newSection.id,
                  type: "description",
                  text: req.body.edescription4
                }])
              })
            /*-----Acá se guardan las categorias del nuevo producto, luego se asocian a dicho producto----*/
              db.Category.bulkCreate([{
                name: req.body.category1,
                image: imageDir.categoryImage1,
                price: Number(req.body.price[0]),
                transaction_cost_percent: req.body.costoTransaccion[1],
                web_sections: req.body.cantidadSecciones1
                },{
                name: req.body.category2,
                image: imageDir.categoryImage2,
                price: Number(req.body.price[1]),
                transaction_cost_percent: req.body.costoTransaccion[2],
                web_sections: req.body.cantidadSecciones2
                },{
                name: req.body.category3,
                image: imageDir.categoryImage3,
                price: Number(req.body.price[2]),
                transaction_cost_percent: req.body.costoTransaccion[3],
                web_sections: req.body.cantidadSecciones3
              }])
              .then(newCategories => {
              /*----Acá se asocian las categorias nuevas al producto nuevo----*/
                for (let newCategory of newCategories) {
                  newCategory.addProducts(newProduct.id);
                }
                
              /*------Acá se recorren los beneficios, y se guardan los nombres en caso de NO ser strings vacíos------*/
                for (let i=0; i < indexBenefits.length; i++) {

                    if(req.body[indexBenefits[i]][0] != '') {

                      db.Benefit.create({
                        name: req.body[indexBenefits[i]][0]
                      }).then(newBenefit => {
                      
                        /*----Recorro las categorías, y las asocio al beneficio (o no) dependiendo de los checkboxes---*/
                        for (let j=0; j < newCategories.length; j++){

                          if(req.body[indexBenefits[i]][j+1] == 'true'){
                            newBenefit.addCategories(newCategories[j].id);
                          }
                        }
                        
                      })

                    }
                }

              })

        })
        res.redirect('/products');
        },
    editProduct: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
        db.Product.findByPk(req.params.id)
        .then(product => {
          res.render('./products/create-edit/product', {productToEdit: product});
        })
       
      } else {
        res.redirect('/users/login')  
      }      
    },
    editCategories: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
        db.Product.findByPk(req.params.id, {
          include: [
            {association: "Sections", 
          include: [{association: "Contents"}]},
            {association: "Categories",
          include: [{association: "Benefits"}]}
          ]
        })
        .then(product => {
          res.render('./products/create-edit/categories', {productToEdit: product});
        })
       
      } else {
        res.redirect('/users/login')  
      }      
    },
    modifyProduct: function(req, res, next) {
      uploadFilesDir(req.files);

    /*----Actualizando los datos del producto en la base de datos----*/
        db.Product.update({
        name: req.body.name,
        type: req.body.type,
        title_banner: req.body.titleBanner1,
        subtitle_banner: req.body.subtitleBanner1,
        image: imageDir.image
      }, {where: {id: req.params.id}})
        .then(()=> {
          res.redirect(`/products/${req.params.id}/edit/categories`);
        })
        .catch((error) => {
          console.log(error);
          let ErrorsJSON = JSON.stringify(error);
          fs.appendFileSync(ErrorsDir, ErrorsJSON);
      })    
    },
    editBenefits: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
        db.Product.findByPk(req.params.id, {
          include: [
            {association: "Sections", 
          include: [{association: "Contents"}]},
            {association: "Categories",
          include: [{association: "Benefits"}]}
          ]
        })
        .then(product => {
          res.render('./products/create-edit/benefits', {productToEdit: product, indexBenefits: indexBenefits});
        })
       
      } else {
        res.redirect('/users/login')  
      }      
    },
    editSections: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
        db.Product.findByPk(req.params.id, {
          include: [
            {association: "Sections", 
          include: [{association: "Contents"}]},
            {association: "Categories",
          include: [{association: "Benefits"}]}
          ]
        })
        .then(product => {
          res.render('./products/create-edit/sections', {productToEdit: product});
        })
       
      } else {
        res.redirect('/users/login')  
      }      
    },
    editContents: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
        db.Product.findByPk(req.params.id, {
          include: [
            {association: "Sections", 
          include: [{association: "Contents"}]},
            {association: "Categories",
          include: [{association: "Benefits"}]}
          ]
        })
        .then(product => {
          res.render('./products/create-edit/contents', {productToEdit: product});
        })
       
      } else {
        res.redirect('/users/login')  
      }      
    },

    editor: function(req, res, next) {
    /*----Acá llamamos a la funcion creada, para que al recibir los archivos subidos, guarde sus nombres en imageDir----*/
    uploadFilesDir(req.files);

    /*----Actualizando los datos del producto en la base de datos----*/
        db.Product.update({
        name: req.body.name,
        type: req.body.type,
        title_banner: req.body.titleBanner1,
        subtitle_banner: req.body.subtitleBanner1,
        image: imageDir.image
      }, {where: {id: req.params.id}})

        /*----Se buscan las secciones asociadas, para luego actualizar dicha información----*/
        db.Section.findAll({
          include: [
            {association: "Products", where: {id: req.params.id}}
          ]
        }).then(associatedSections => {

          /*----Se actualizan las secciones asociadas a dicho producto----*/
          
            db.Section.update({
              title: req.body.atitle,
              image: imageDir.aimage
            }, {where: {id: associatedSections[0].id}})

            db.Section.update({
              title: req.body.btitle,
              image: imageDir.bimage
            }, {where: {id: associatedSections[1].id}})

            db.Section.update({
              title: req.body.ctitle,
              image: imageDir.cimage
            }, {where: {id: associatedSections[2].id}})

            db.Section.update({
              title: req.body.dtitle,
              image: imageDir.dimage
            }, {where: {id: associatedSections[3].id}})

            db.Section.update({
              title: req.body.etitle,
              image: imageDir.eimage
            }, {where: {id: associatedSections[4].id}})

          })

          /*----Se buscan los contenidos asociados a cada sección, para luego actualizar dicha información----*/
            db.Content.findAll({
              include: [
                {association: "Sections", where: {product_id: req.params.id}}
              ]
            }).then(associatedContents => {

            /*---Acá guardo en arrays los ID de los contenidos y las secciones, para aplicarlos en el where del update y que se actualicen bien sin mezclarse----*/
              var contentIndex = [];
              var sectionIndex = [];
              for (let i=0; i < associatedContents.length; i++) {
                contentIndex.push(associatedContents[i].id);
                
                /*----Verifico que no se repitan los ID de seccion, en el array guardado, ya que son varios Contents----*/
                if (!sectionIndex.includes(associatedContents[i].section_id)) {
                  sectionIndex.push(associatedContents[i].section_id);
                }
              }
              /*-----Acá se actualizan los contenidos asociados a la seccion 1----*/
              db.Content.update({
                type: "icon",
                text: imageDir.aicon1
              }, {where: {id: contentIndex[0], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.asubtitle1
              }, {where: {id: contentIndex[1], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "description",
                text: req.body.adescription1
              }, {where: {id: contentIndex[2], section_id: sectionIndex[0]}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.aicon2
              }, {where: {id: contentIndex[3], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.asubtitle2
              }, {where: {id: contentIndex[4], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "description",
                text: req.body.adescription2
              }, {where: {id: contentIndex[5], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "icon",
                text: imageDir.aicon3
              }, {where: {id: contentIndex[6], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.asubtitle3
              }, {where: {id: contentIndex[7], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "description",
                text: req.body.adescription3
              }, {where: {id: contentIndex[8], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "icon",
                text: imageDir.aicon4
              }, {where: {id: contentIndex[9], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.asubtitle4
              }, {where: {id: contentIndex[10], section_id: sectionIndex[0]}})

              db.Content.update({
                type: "description",
                text: req.body.adescription4
              }, {where: {id: contentIndex[11], section_id: sectionIndex[0]}})

              /*-----Acá se actualizan los contenidos asociados a la seccion 2----*/
              db.Content.update({
                type: "icon",
                text: imageDir.bicon1
              }, {where: {id: contentIndex[12], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.bsubtitle1
              }, {where: {id: contentIndex[13], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "description",
                text: req.body.bdescription1
              }, {where: {id: contentIndex[14], section_id: sectionIndex[1]}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.bicon2
              }, {where: {id: contentIndex[15], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.bsubtitle2
              }, {where: {id: contentIndex[16], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "description",
                text: req.body.bdescription2
              }, {where: {id: contentIndex[17], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "icon",
                text: imageDir.bicon3
              }, {where: {id: contentIndex[18], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.bsubtitle3
              }, {where: {id: contentIndex[19], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "description",
                text: req.body.bdescription3
              }, {where: {id: contentIndex[20], section_id: sectionIndex[1]}})
        
              db.Content.update({
                type: "icon",
                text: imageDir.bicon4
              }, {where: {id: contentIndex[21], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.bsubtitle4
              }, {where: {id: contentIndex[22], section_id: sectionIndex[1]}})

              db.Content.update({
                type: "description",
                text: req.body.bdescription4
              }, {where: {id: contentIndex[23], section_id: sectionIndex[1]}})

              /*-----Acá se actualizan los contenidos asociados a la seccion 3----*/
              db.Content.update({
                type: "icon",
                text: imageDir.cicon1
              }, {where: {id: contentIndex[24], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.csubtitle1
              }, {where: {id: contentIndex[25], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "description",
                text: req.body.cdescription1
              }, {where: {id: contentIndex[26], section_id: sectionIndex[2]}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.cicon2
              }, {where: {id: contentIndex[27], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.csubtitle2
              }, {where: {id: contentIndex[28], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "description",
                text: req.body.cdescription2
              }, {where: {id: contentIndex[29], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "icon",
                text: imageDir.cicon3
              }, {where: {id: contentIndex[30], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.csubtitle3
              }, {where: {id: contentIndex[31], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "description",
                text: req.body.cdescription3
              }, {where: {id: contentIndex[32], section_id: sectionIndex[2]}})
        
              db.Content.update({
                type: "icon",
                text: imageDir.cicon4
              }, {where: {id: contentIndex[33], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.csubtitle4
              }, {where: {id: contentIndex[34], section_id: sectionIndex[2]}})

              db.Content.update({
                type: "description",
                text: req.body.cdescription4
              }, {where: {id: contentIndex[35], section_id: sectionIndex[2]}})

              /*-----Acá se actualizan los contenidos asociados a la seccion 4----*/
             db.Content.update({
                type: "icon",
                text: imageDir.dicon1
              }, {where: {id: contentIndex[36], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.dsubtitle1
              }, {where: {id: contentIndex[37], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "description",
                text: req.body.ddescription1
              }, {where: {id: contentIndex[38], section_id: sectionIndex[3]}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.dicon2
              }, {where: {id: contentIndex[39], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.dsubtitle2
              }, {where: {id: contentIndex[40], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "description",
                text: req.body.ddescription2
              }, {where: {id: contentIndex[41], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "icon",
                text: imageDir.dicon3
              }, {where: {id: contentIndex[42], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.dsubtitle3
              }, {where: {id: contentIndex[43], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "description",
                text: req.body.ddescription3
              }, {where: {id: contentIndex[44], section_id: sectionIndex[3]}})
        
              db.Content.update({
                type: "icon",
                text: imageDir.dicon4
              }, {where: {id: contentIndex[45], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.dsubtitle4
              }, {where: {id: contentIndex[46], section_id: sectionIndex[3]}})

              db.Content.update({
                type: "description",
                text: req.body.ddescription4
              }, {where: {id: contentIndex[47], section_id: sectionIndex[3]}})

              /*-----Acá se actualizan los contenidos asociados a la seccion 5----*/
             db.Content.update({
                type: "icon",
                text: imageDir.eicon1
              }, {where: {id: contentIndex[48], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.esubtitle1
              }, {where: {id: contentIndex[49], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "description",
                text: req.body.edescription1
              }, {where: {id: contentIndex[50], section_id: sectionIndex[4]}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.eicon2
              }, {where: {id: contentIndex[51], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.esubtitle2
              }, {where: {id: contentIndex[52], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "description",
                text: req.body.edescription2
              }, {where: {id: contentIndex[53], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "icon",
                text: imageDir.eicon3
              }, {where: {id: contentIndex[54], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.esubtitle3
              }, {where: {id: contentIndex[55], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "description",
                text: req.body.edescription3
              }, {where: {id: contentIndex[56], section_id: sectionIndex[4]}})
        
              db.Content.update({
                type: "icon",
                text: imageDir.eicon4
              }, {where: {id: contentIndex[57], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "subtitle",
                text: req.body.esubtitle4
              }, {where: {id: contentIndex[58], section_id: sectionIndex[4]}})

              db.Content.update({
                type: "description",
                text: req.body.edescription4
              }, {where: {id: contentIndex[59], section_id: sectionIndex[4]}})
              
          })

        /*----Se buscan las categorias asociadas, para luego actualizar dicha información----*/
        db.Category.findAll({
          include: [
            {association: "Products", where: {id: req.params.id}}
          ]
        }).then(associatedCategories => {

        /*----Se actualizan las categorías asociadas a dicho producto----*/
          db.Category.update({
            name: req.body.category1,
            image: imageDir.categoryImage1,
            price: Number(req.body.price[0]),
            transaction_cost_percent: req.body.costoTransaccion[1],
            web_sections: req.body.cantidadSecciones1        

          }, {where: {id: associatedCategories[0].id}});
          
          db.Category.update({
            name: req.body.category2,
            image: imageDir.categoryImage2,
            price: Number(req.body.price[1]),
            transaction_cost_percent: req.body.costoTransaccion[2],
            web_sections: req.body.cantidadSecciones2        
    
          }, {where: {id: associatedCategories[1].id}});

          db.Category.update({
            name: req.body.category3,
            image: imageDir.categoryImage3,
            price: Number(req.body.price[2]),
            transaction_cost_percent: req.body.costoTransaccion[3],
            web_sections: req.body.cantidadSecciones3        
    
          }, {where: {id: associatedCategories[2].id}});
            
          
            /*----Se buscan los beneficios asociados a cada categoria del producto, para luego actualizar dicha información----*/
              db.Benefit.findAll({
                include: [
                  {association: "Categories", 
                  include: [{association: "Products", where: {id: req.params.id}}]}
                ]
              }).then(associatedBenefits => {

              /*----Recorre los beneficios, y actualiza los nombres----*/
                for (let i=0; i < associatedBenefits.length; i++) {
                  /*----Si el nombre del beneficio NO es un string vacío, se actualiza dicho beneficio----*/
                  if(typeof req.body[indexBenefits[i]][0] != 'undefined' && req.body[indexBenefits[i]][0] != '') {
                    /*---Guarda los cambios en el nombre de beneficio----*/
                    db.Benefit.update({
                      name: req.body[indexBenefits[i]][0]
                      },{where: {id: associatedBenefits[i].id}})

                  /*----Si el nombre del beneficio es un string vacío, se borra dicho beneficio----*/
                  } else if(typeof req.body[indexBenefits[i]][0] != 'undefined' && req.body[indexBenefits[i]][0] == '') {

                    db.Benefit.destroy({where: {id: {[db.Sequelize.Op.like] : [associatedBenefits[i].id]} }})
                  }
                  
                  /*----Chequea las asociaciones de beneficios con categorias, y las modifica si fueron modificados los checkboxes---*/
                  
                  /*---Dentro de cada beneficio, recorre cada Categoría----*/
                  // for (let j=0; j < associatedCategories.length; j++) {
                    
                  //   /*---Si el checkbox está destilado, pero está asociado el beneficio a la categoria, borra la asociacion----*/
                  //   if(typeof req.body[indexBenefits[i]] != 'undefined' && req.body[indexBenefits[i]][j+1] != 'true' && typeof associatedBenefits[i].Categories[j] != 'undefined' && associatedBenefits[i].Categories[j].id == associatedCategories[j].id) {
                  //     associatedBenefits[i].removeCategories(associatedCategories[j].id);
                  //   }
                  //   /*---Si el checkbox está tildado, pero NO está asociado el beneficio a la categoria, crea la asociacion----*/
                  //   if(typeof req.body[indexBenefits[i]] != 'undefined' && req.body[indexBenefits[i]][j+1] == 'true' && typeof associatedBenefits[i].Categories[j] != 'undefined' && associatedBenefits[i].Categories[j].id != associatedCategories[j].id) {
                  //     associatedBenefits[i].addCategories(associatedCategories[j].id);
                  //   }

                  // }

                  }
                
              })
        })

		  res.redirect('/products');
    
    },
    borrado: function(req, res, next) {
      /*----Borrando la fila del producto en la base de datos (soft-delete)----*/
    db.Product.destroy({where: {id: {[db.Sequelize.Op.like] : [req.params.id]} }})

    res.redirect('/products');
    }    
}
module.exports = productosController;