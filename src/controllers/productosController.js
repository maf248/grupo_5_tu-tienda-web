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
          image: imageDir.image,
          Categories: [{
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
            }],
          Sections: [{
            title: req.body.atitle,
            image: imageDir.aimage,
              Contents: [{
                type: "icon",
                text: imageDir.aicon1
              },{
                type: "subtitle",
                text: req.body.asubtitle1
              },{
                type: "description",
                text: req.body.adescription1
              },{
                type: "icon",
                text: imageDir.aicon2
              },{
                type: "subtitle",
                text: req.body.asubtitle2
              },{
                type: "description",
                text: req.body.adescription2
              },{
                type: "icon",
                text: imageDir.aicon3
              },{
                type: "subtitle",
                text: req.body.asubtitle3
              },{
                type: "description",
                text: req.body.adescription3
              },{
                type: "icon",
                text: imageDir.aicon4
              },{
                type: "subtitle",
                text: req.body.asubtitle4
              },{
                type: "description",
                text: req.body.adescription4
              }]
            },{
            title: req.body.btitle,
            image: imageDir.bimage,
              Contents: [{
                type: "icon",
                text: imageDir.bicon1
              },{
                type: "subtitle",
                text: req.body.bsubtitle1
              },{
                type: "description",
                text: req.body.bdescription1
              },{
                type: "icon",
                text: imageDir.bicon2
              },{
                type: "subtitle",
                text: req.body.bsubtitle2
              },{
                type: "description",
                text: req.body.bdescription2
              },{
                type: "icon",
                text: imageDir.bicon3
              },{
                type: "subtitle",
                text: req.body.bsubtitle3
              },{
                type: "description",
                text: req.body.bdescription3
              },{
                type: "icon",
                text: imageDir.bicon4
              },{
                type: "subtitle",
                text: req.body.bsubtitle4
              },{
                type: "description",
                text: req.body.bdescription4
              }]
            },{
            title: req.body.ctitle,
            image: imageDir.cimage,
              Contents: [{
                type: "icon",
                text: imageDir.cicon1
              },{
                type: "subtitle",
                text: req.body.csubtitle1
              },{
                type: "description",
                text: req.body.cdescription1
              },{
                type: "icon",
                text: imageDir.cicon2
              },{
                type: "subtitle",
                text: req.body.csubtitle2
              },{
                type: "description",
                text: req.body.cdescription2
              },{
                type: "icon",
                text: imageDir.cicon3
              },{
                type: "subtitle",
                text: req.body.csubtitle3
              },{
                type: "description",
                text: req.body.cdescription3
              },{
                type: "icon",
                text: imageDir.cicon4
              },{
                type: "subtitle",
                text: req.body.csubtitle4
              },{
                type: "description",
                text: req.body.cdescription4
              }]
            },{
            title: req.body.dtitle,
            image: imageDir.dimage,
              Contents: [{
                type: "icon",
                text: imageDir.dicon1
              },{
                type: "subtitle",
                text: req.body.dsubtitle1
              },{
                type: "description",
                text: req.body.ddescription1
              },{
                type: "icon",
                text: imageDir.dicon2
              },{
                type: "subtitle",
                text: req.body.dsubtitle2
              },{
                type: "description",
                text: req.body.ddescription2
              },{
                type: "icon",
                text: imageDir.dicon3
              },{
                type: "subtitle",
                text: req.body.dsubtitle3
              },{
                type: "description",
                text: req.body.ddescription3
              },{
                type: "icon",
                text: imageDir.dicon4
              },{
                type: "subtitle",
                text: req.body.dsubtitle4
              },{
                type: "description",
                text: req.body.ddescription4
              }]
            },{
            title: req.body.etitle,
            image: imageDir.eimage,
              Contents: [{
                type: "icon",
                text: imageDir.eicon1
              },{
                type: "subtitle",
                text: req.body.esubtitle1
              },{
                type: "description",
                text: req.body.edescription1
              },{
                type: "icon",
                text: imageDir.eicon2
              },{
                type: "subtitle",
                text: req.body.esubtitle2
              },{
                type: "description",
                text: req.body.edescription2
              },{
                type: "icon",
                text: imageDir.eicon3
              },{
                type: "subtitle",
                text: req.body.esubtitle3
              },{
                type: "description",
                text: req.body.edescription3
              },{
                type: "icon",
                text: imageDir.eicon4
              },{
                type: "subtitle",
                text: req.body.esubtitle4
              },{
                type: "description",
                text: req.body.edescription4
              }]
            }]
        }, {include: [{association: 'Sections', include: [{association: 'Contents'}]}, {association: 'Categories'}]})
        
        /*------Acá se guardan los beneficios en caso de no ser strings vacíos------*/
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

    /*----Actualizando los datos de formularios, en la variable products----*/
      db.Product.update({
        name: req.body.name,
        type: req.body.type,
        title_banner: req.body.titleBanner1,
        subtitle_banner: req.body.subtitleBaner1,
        image: imageDir.image
      }, {where: {id: req.params.id}})

      db.Category.update({
        name: req.body.category1,
        image: imageDir.categoryImage1,
        price: Number(req.body.price[0]),
        transaction_cost_percent: req.body.costoTransaccion[1],
        web_sections: req.body.cantidadSecciones1        

      }, {where: {product_id: req.params.id}})

      db.Section.update({
        title: req.body.atitle,
        image: imageDir.aimage
      }, {where: {product_id: req.params.id}})

      db.Content.update({
        type: 'icon',
        text: imageDir.aicon1
      }, {where: {product_id: req.params.id}})

    /*
    for (let i = 0; i < indexBenefits.length; i++) {
      if (req.body[indexBenefits[i]][0] != "") {
        products[products.length -1].benefits[indexBenefits[i]] = [req.body[indexBenefits[i]][0], req.body[indexBenefits[i]][1], req.body[indexBenefits[i]][2], req.body[indexBenefits[i]][3]];
        }
      }
    */
   
		res.redirect('/products');
    },
    borrado: function(req, res, next) {
      /*----Borrando la fila del producto en la base de datos (soft-delete)----*/
    db.Product.destroy({where: {id: {[db.Sequelize.Op.like] : [req.params.id]} }})

    res.redirect('/products');
    }    
}
module.exports = productosController;