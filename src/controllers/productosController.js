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
    creacion: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
            res.render('./products/create', {indexBenefits: indexBenefits} ); 
          } else {
            res.redirect('/users/login')
          }
        },
    creador: function(req, res, next) {
      /*----Acá llamamos a la funcion creada, para que al recibir los archivos subidos, guarde sus nombres en imageDir----*/
      uploadFilesDir(req.files);


       /*----Acá guardamos toda la información del producto nuevo (a excepcion de los beneficios)----*/
       db.Product.create({
          name: req.body.name,
          type: req.body.type,
          title_banner: req.body.titleBanner1,
          subtitle_banner: req.body.subtitleBanner1,
          image: imageDir.image
        }).then(newProduct => {

            db.Category.create({
              name: req.body.category1,
              image: imageDir.categoryImage1,
              price: Number(req.body.price[0]),
              transaction_cost_percent: req.body.costoTransaccion[1],
              web_sections: req.body.cantidadSecciones1
              }).then(newCategory => {
                newCategory.addProducts(newProduct.id)
                })

              db.Category.create({
              name: req.body.category2,
              image: imageDir.categoryImage2,
              price: Number(req.body.price[1]),
              transaction_cost_percent: req.body.costoTransaccion[2],
              web_sections: req.body.cantidadSecciones2
              }).then(newCategory => {
                  newCategory.addProducts(newProduct.id)
                })

              db.Category.create({
              name: req.body.category3,
              image: imageDir.categoryImage3,
              price: Number(req.body.price[2]),
              transaction_cost_percent: req.body.costoTransaccion[3],
              web_sections: req.body.cantidadSecciones3
              }).then(newCategory => {
                  newCategory.addProducts(newProduct.id)
                })

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


        })
        
        /*------Acá se guardan los nombres de los beneficios en caso de no ser strings vacíos------*/
          for (let i=0; i < indexBenefits.length; i++) {
            if(req.body[indexBenefits[i]][0] != '') {
              db.Benefit.create({
                name: req.body[indexBenefits[i]][0]
              })
            }
          }
          
          res.redirect('/products');
        
        },
    edicion: function(req, res, next) {
      if (req.session.user != undefined && req.session.user.role == 'admin') {
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
        .then(product => {
          res.render('./products/edit', {productToEdit: product, indexBenefits: indexBenefits});
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
          
        })
        /*----Se buscan las secciones asociadas, para luego actualizar dicha información----*/
        db.Section.findAll({
          include: [
            {association: "Products", where: {id: req.params.id}}
          ]
        }).then(associatedSections => {

          /*----Se actualizan las categorías asociadas a dicho producto----*/
          
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

          /*----Se buscan los contenidos asociados a cada sección, para luego actualizar dicha información----*/
            
            db.Content.findAll({
              include: [
                {association: "Sections", where: {product_id: req.params.id}}
              ]
            }).then(associatedContents => {

              res.send(associatedContents)

              /*-----Acá se actualizan los contenidos asociados a la seccion 1----*/
              /*db.Content.update({
                type: "icon",
                text: imageDir.aicon1
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.asubtitle1
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "description",
                text: req.body.adescription1
              }, {where: {id: associatedSections[0].id}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.aicon2
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.asubtitle2
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "description",
                text: req.body.adescription2
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "icon",
                text: imageDir.aicon3
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.asubtitle3
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "description",
                text: req.body.adescription3
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "icon",
                text: imageDir.aicon4
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.asubtitle4
              }, {where: {id: associatedSections[0].id}})

              db.Content.update({
                type: "description",
                text: req.body.adescription4
              }, {where: {id: associatedSections[0].id}})

              /*-----Acá se actualizan los contenidos asociados a la seccion 2----*/
              /*db.Content.update({
                type: "icon",
                text: imageDir.bicon1
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.bsubtitle1
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "description",
                text: req.body.bdescription1
              }, {where: {id: associatedSections[1].id}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.bicon2
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.bsubtitle2
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "description",
                text: req.body.bdescription2
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "icon",
                text: imageDir.bicon3
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.bsubtitle3
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "description",
                text: req.body.bdescription3
              }, {where: {id: associatedSections[1].id}})
        
              db.Content.update({
                type: "icon",
                text: imageDir.bicon4
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.bsubtitle4
              }, {where: {id: associatedSections[1].id}})

              db.Content.update({
                type: "description",
                text: req.body.bdescription4
              }, {where: {id: associatedSections[1].id}})

              /*-----Acá se actualizan los contenidos asociados a la seccion 3----*/
              /*db.Content.update({
                type: "icon",
                text: imageDir.cicon1
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.csubtitle1
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "description",
                text: req.body.cdescription1
              }, {where: {id: associatedSections[2].id}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.cicon2
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.csubtitle2
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "description",
                text: req.body.cdescription2
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "icon",
                text: imageDir.cicon3
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.csubtitle3
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "description",
                text: req.body.cdescription3
              }, {where: {id: associatedSections[2].id}})
        
              db.Content.update({
                type: "icon",
                text: imageDir.cicon4
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.csubtitle4
              }, {where: {id: associatedSections[2].id}})

              db.Content.update({
                type: "description",
                text: req.body.cdescription4
              }, {where: {id: associatedSections[2].id}})

              /*-----Acá se actualizan los contenidos asociados a la seccion 4----*/
              /*db.Content.update({
                type: "icon",
                text: imageDir.dicon1
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.dsubtitle1
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "description",
                text: req.body.ddescription1
              }, {where: {id: associatedSections[3].id}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.dicon2
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.dsubtitle2
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "description",
                text: req.body.ddescription2
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "icon",
                text: imageDir.dicon3
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.dsubtitle3
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "description",
                text: req.body.ddescription3
              }, {where: {id: associatedSections[3].id}})
        
              db.Content.update({
                type: "icon",
                text: imageDir.dicon4
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.dsubtitle4
              }, {where: {id: associatedSections[3].id}})

              db.Content.update({
                type: "description",
                text: req.body.ddescription4
              }, {where: {id: associatedSections[3].id}})

              /*-----Acá se actualizan los contenidos asociados a la seccion 5----*/
              /*db.Content.update({
                type: "icon",
                text: imageDir.eicon1
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.esubtitle1
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "description",
                text: req.body.edescription1
              }, {where: {id: associatedSections[4].id}})
              
              db.Content.update({
                type: "icon",
                text: imageDir.eicon2
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.esubtitle2
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "description",
                text: req.body.edescription2
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "icon",
                text: imageDir.eicon3
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.esubtitle3
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "description",
                text: req.body.edescription3
              }, {where: {id: associatedSections[4].id}})
        
              db.Content.update({
                type: "icon",
                text: imageDir.eicon4
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "subtitle",
                text: req.body.esubtitle4
              }, {where: {id: associatedSections[4].id}})

              db.Content.update({
                type: "description",
                text: req.body.edescription4
              }, {where: {id: associatedSections[4].id}})
              */
          })

            
        })

        
    /*
    for (let i = 0; i < indexBenefits.length; i++) {
      if (req.body[indexBenefits[i]][0] != "") {
        products[products.length -1].benefits[indexBenefits[i]] = [req.body[indexBenefits[i]][0], req.body[indexBenefits[i]][1], req.body[indexBenefits[i]][2], req.body[indexBenefits[i]][3]];
        }
      }
    */
   
		//res.redirect('/products');
    },
    borrado: function(req, res, next) {
      /*----Borrando la fila del producto en la base de datos (soft-delete)----*/
    db.Product.destroy({where: {id: {[db.Sequelize.Op.like] : [req.params.id]} }})

    res.redirect('/products');
    }    
}
module.exports = productosController;