const fs = require('fs');
const path = require('path');
const { Recoverable } = require('repl');
const { isContext } = require('vm');
const productsDir = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsDir, 'utf-8'));

const db = require('../database/models');

/*----- Acá generamos un indice alfabetico de Benefits para luego utilizar al recorrer los beneficios A, B, C....etc -----*/
const indexBenefits = "abcdefghijklmnopqrstuvwx";

/*----Acá creamos un objeto que guardará el nombre de archivo subico, correspondiente a cada input----*/
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
            console.log(product);
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
       /*----Acá guardamos toda la información del producto nuevo----*/
       db.Product.create({
          name: req.body.name,
          type: req.body.type,
          title_banner: req.body.titleBanner1,
          subtitle_banner: req.body.subtitleBanner1,
          image: imageDir.image,
          Sections: [{
            title: req.body.atitle,
            image: imageDir.aimage
            },{
            title: req.body.btitle,
            image: imageDir.bimage
            },{
            title: req.body.ctitle,
            image: imageDir.cimage
            },{
            title: req.body.dtitle,
            image: imageDir.dimage
            },{
            title: req.body.etitle,
            image: imageDir.eimage
            }]
        }, {include: [{association: 'Sections'}]})
        /*
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

      db.Content.bulkCreate([{
        type: "icon",
        text: imageDir.aicon1
      },{
        type: "subtitle",
        text: req.body.bsubtitle1
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
      },{
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
      },{
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
      },{
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
      },{
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
      }])  */

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
          console.log(product)
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

                    /*----Generales----*/
    products[req.params.id -1].price = [Number(req.body.price[0]), Number(req.body.price[1]), Number(req.body.price[2])];
    products[req.params.id -1].category = [req.body.category1, req.body.category2, req.body.category3];
    products[req.params.id -1].categoryImage = [imageDir.categoryImage1, imageDir.categoryImage2, imageDir.categoryImage3];
    products[req.params.id -1].description = req.body.description;
                    /*----Sección 1----*/
    products[req.params.id -1].seccion1.atitle = req.body.atitle;
    products[req.params.id -1].seccion1.aicon1 = imageDir.aicon1;
    products[req.params.id -1].seccion1.asubtitle1 = req.body.asubtitle1;
    products[req.params.id -1].seccion1.adescription1 = req.body.adescription1;
    products[req.params.id -1].seccion1.asubtitle2 = req.body.asubtitle2;
    products[req.params.id -1].seccion1.aicon2 = imageDir.aicon2;
    products[req.params.id -1].seccion1.adescription2 = req.body.adescription2;
    products[req.params.id -1].seccion1.asubtitle3 = req.body.asubtitle3;
    products[req.params.id -1].seccion1.aicon3 = imageDir.aicon3;
    products[req.params.id -1].seccion1.adescription3 = req.body.adescription3;
    products[req.params.id -1].seccion1.asubtitle4 = req.body.asubtitle4;
    products[req.params.id -1].seccion1.adescription4 = req.body.adescription4;
    products[req.params.id -1].seccion1.aicon4 = imageDir.aicon4;
    products[req.params.id -1].seccion1.aimage = imageDir.aimage;
                    /*----Sección 2----*/
    products[req.params.id -1].seccion2.btitle = req.body.btitle;
    products[req.params.id -1].seccion2.bicon1 = imageDir.bicon1;
    products[req.params.id -1].seccion2.bsubtitle1 = req.body.bsubtitle1;
    products[req.params.id -1].seccion2.bdescription1 = req.body.bdescription1;
    products[req.params.id -1].seccion2.bsubtitle2 = req.body.bsubtitle2;
    products[req.params.id -1].seccion2.bicon2 = imageDir.bicon2;
    products[req.params.id -1].seccion2.bdescription2 = req.body.bdescription2;
    products[req.params.id -1].seccion2.bsubtitle3 = req.body.bsubtitle3;
    products[req.params.id -1].seccion2.bicon3 = imageDir.bicon3;
    products[req.params.id -1].seccion2.bdescription3 = req.body.bdescription3;
    products[req.params.id -1].seccion2.bsubtitle4 = req.body.bsubtitle4;
    products[req.params.id -1].seccion2.bicon4 = imageDir.bicon4;
    products[req.params.id -1].seccion2.bdescription4 = req.body.bdescription4;
    products[req.params.id -1].seccion2.bimage = imageDir.bimage;
                    /*----Sección 3----*/
    products[req.params.id -1].seccion3.ctitle = req.body.ctitle;
    products[req.params.id -1].seccion3.cicon1 = imageDir.cicon1;
    products[req.params.id -1].seccion3.csubtitle1 = req.body.csubtitle1;
    products[req.params.id -1].seccion3.cdescription1 = req.body.cdescription1;
    products[req.params.id -1].seccion3.csubtitle2 = req.body.csubtitle2;
    products[req.params.id -1].seccion3.cicon2 = imageDir.cicon2;
    products[req.params.id -1].seccion3.cdescription2 = req.body.cdescription2;
    products[req.params.id -1].seccion3.csubtitle3 = req.body.csubtitle3;
    products[req.params.id -1].seccion3.cicon3 = imageDir.cicon3;
    products[req.params.id -1].seccion3.cdescription3 = req.body.cdescription3;
    products[req.params.id -1].seccion3.csubtitle4 = req.body.csubtitle4;
    products[req.params.id -1].seccion3.cicon4 = imageDir.cicon4;
    products[req.params.id -1].seccion3.cdescription4 = req.body.cdescription4;
    products[req.params.id -1].seccion3.cimage = imageDir.cimage;
                    /*----Sección 4----*/
    products[req.params.id -1].seccion4.dtitle = req.body.dtitle;
    products[req.params.id -1].seccion4.dicon1 = imageDir.dicon1;
    products[req.params.id -1].seccion4.dsubtitle1 = req.body.dsubtitle1;
    products[req.params.id -1].seccion4.ddescription1 = req.body.ddescription1;
    products[req.params.id -1].seccion4.dsubtitle2 = req.body.dsubtitle2;
    products[req.params.id -1].seccion4.dicon2 = imageDir.dicon2;
    products[req.params.id -1].seccion4.ddescription2 = req.body.ddescription2;
    products[req.params.id -1].seccion4.dsubtitle3 = req.body.dsubtitle3;
    products[req.params.id -1].seccion4.dicon3 = imageDir.dicon3;
    products[req.params.id -1].seccion4.ddescription3 = req.body.ddescription3;
    products[req.params.id -1].seccion4.dsubtitle4 = req.body.dsubtitle4;
    products[req.params.id -1].seccion4.dicon4 = imageDir.dicon4;
    products[req.params.id -1].seccion4.ddescription4 = req.body.ddescription4;
    products[req.params.id -1].seccion4.dimage = imageDir.dimage;
                    /*----Sección 5----*/
    products[req.params.id -1].seccion5.etitle = req.body.etitle;
    products[req.params.id -1].seccion5.eicon1 = imageDir.eicon1;
    products[req.params.id -1].seccion5.esubtitle1 = req.body.esubtitle1;
    products[req.params.id -1].seccion5.edescription1 = req.body.edescription1;
    products[req.params.id -1].seccion5.esubtitle2 = req.body.esubtitle2;
    products[req.params.id -1].seccion5.eicon2 = imageDir.eicon2;
    products[req.params.id -1].seccion5.edescription2 = req.body.edescription2;
    products[req.params.id -1].seccion5.esubtitle3 = req.body.esubtitle3;
    products[req.params.id -1].seccion5.eicon3 = imageDir.eicon3;
    products[req.params.id -1].seccion5.edescription3 = req.body.edescription3;
    products[req.params.id -1].seccion5.esubtitle4 = req.body.esubtitle4;
    products[req.params.id -1].seccion5.eicon4 = imageDir.eicon4;
    products[req.params.id -1].seccion5.edescription4 = req.body.edescription4;
    products[req.params.id -1].seccion5.eimage = imageDir.eimage;
                /*----Benefits----*/
    products[req.params.id -1].benefits.costoTransaccion = ["Costo por transacción", req.body.costoTransaccion[1], req.body.costoTransaccion[2], req.body.costoTransaccion[3]]
    products[req.params.id -1].benefits.cantidadSecciones = ["Cantidad de secciones", req.body.cantidadSecciones1 , req.body.cantidadSecciones2, req.body.cantidadSecciones3]

    for (let i = 0; i < indexBenefits.length; i++) {
      if (req.body[indexBenefits[i]][0] != "") {
        products[products.length -1].benefits[indexBenefits[i]] = [req.body[indexBenefits[i]][0], req.body[indexBenefits[i]][1], req.body[indexBenefits[i]][2], req.body[indexBenefits[i]][3]];
        }
      }

    /*----Acá termina la actualización de datos de formularios, en la variable products----*/

    /*----Guardando imagen nueva y cambios en productos data base----*/
		products[req.params.id -1].image = imageDir.image;
		const productsJSON = JSON.stringify(products);
		fs.writeFileSync(productsDir, productsJSON);
		res.redirect('/products');
    },
    borrado: function(req, res, next) {
      /*----Borrando indice del producto en variable----*/
		products.splice(req.params.id -1, 1);
		/*----Corrigiendo id en array productos----*/
		for (let i = 0; i < products.length; i++){
			products[i].id = i + 1;
		}
		/*----Guardando cambios en productos data base----*/
		const productsJSON = JSON.stringify(products);
		fs.writeFileSync(productsDir, productsJSON);
    res.redirect('/products');
    }    
}
module.exports = productosController;