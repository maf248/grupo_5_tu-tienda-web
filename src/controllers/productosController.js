const fs = require('fs');
const path = require('path');
const { Recoverable } = require('repl');
const productsDir = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsDir, 'utf-8'));

/*----- Acá filtramos el JSON en las diferentes categorías de producto -----*/
const tiendaWeb = products.filter( item => item.type == 'tiendaWeb' );
const paginaWeb = products.filter( item => item.type == 'paginaWeb' );

const productosController = {
    detalle: function(req, res, next) {

        /*-----Acá pasamos la vista de producto según  el id -----*/
        /*-----Agregamos también las funcionalidades a la vista de ejs-----*/
        if ( req.params.id - 1 < products.length ) {
          res.render('./products/producto', { product: products[req.params.id -1], tiendaWeb, paginaWeb });   
        } else {
          res.send('No tenemos un producto con ese ID');
      }
    },
    listado: function(req, res, next) {
          res.render('./products/listado-productos', {products: products});
        },
    creacion: function(req, res, next) {
          res.render('./products/create'); 
        },
    creador: function(req, res, next) {
      products.push(
         {
          "id": products.length,
          "name": req.body.name,
          "type": req.body.type,
          "titleBanner1": req.body.titleBanner1,
          "subtitleBaner1": req.body.subtitleBanner1,
          "seccion1": {
              "atitle": req.body.atitle, 
              "aicon1":req.body.aicon1, 
              "asubtitle1":req.body.asubtitle1, 
              "adescription1":req.body.adescription1,
              "asubtitle2":req.body.asubtitle2, 
              "aicon2": req.body.aicon2, 
              "adescription2": req.body.adescription2, 
              "asubtitle3":req.body.asubtitle3, 
              "aicon3": req.body.aicon3, 
              "adescription3": req.body.adescription3, 
              "asubtitle4":req.body.asubtitle4, 
              "aicon4": req.body.aicon4, 
              "adescription4": req.body.adescription4, 
              "aimage":req.body.aimage
          }, 
          "seccion2": {
              "btitle": req.body.btitle, 
              "bicon1":req.body.bicon1, 
              "bsubtitle1":req.body.bsubtitle1, 
              "bdescription1":req.body.bdescription1, 
              "bsubtitle2":req.body.bsubtitle2, 
              "bicon2": req.body.bicon2, 
              "bdescription2": req.body.bdescription2, 
              "bsubtitle3":req.body.bsubtitle3, 
              "bicon3": req.body.bicon3, 
              "bdescription3": req.body.bdescription3,
              "bsubtitle4":req.body.bsubtitle4, 
              "bicon4": req.body.bicon4, 
              "bdescription4": req.body.bdescription4, 
              "bimage": req.body.bimage
          }, 
          "seccion3": {
              "ctitle": req.body.ctitle, 
              "cicon1":req.body.cicon1, 
              "csubtitle1":req.body.csubtitle1, 
              "cdescription1":req.body.cdescription1,
              "csubtitle2":req.body.csubtitle2, 
              "cicon2": req.body.cicon2, 
              "cdescription2": req.body.cdescription2, 
              "csubtitle3":req.body.csubtitle3, 
              "cicon3": req.body.cicon3, 
              "cdescription3": req.body.cdescription3, 
              "csubtitle4":req.body.csubtitle4, 
              "cicon4": req.body.cicon4, 
              "cdescription4": req.body.cdescription4, 
              "cimage":req.body.cimage 
          },
          "seccion4": {
              "dtitle": req.body.dtitle, 
              "dicon1":req.body.dicon1, 
              "dsubtitle1":req.body.dsubtitle1, 
              "ddescription1":req.body.ddescription1, 
              "dsubtitle2":req.body.dsubtitle2, 
              "dicon2": req.body.dicon2, 
              "ddescription2": req.body.ddescription2, 
              "dsubtitle3":req.body.dsubtitle3, 
              "dicon3": req.body.dicon3, 
              "ddescription3": req.body.ddescription3, 
              "dsubtitle4":req.body.dsubtitle4, 
              "dicon4": req.body.dicon4, 
              "ddescription4": req.body.ddescription4, 
              "dimage": req.body.dimage
          },
          "seccion5": {
              "etitle": req.body.etitle, 
              "eicon1":req.body.eicon1, 
              "esubtitle1":req.body.esubtitle1, 
              "edescription1":req.body.edescription1, 
              "esubtitle2":req.body.esubtitle2, 
              "eicon2": req.body.esubtitle2, 
              "edescription2": req.body.edescription2, 
              "esubtitle3":req.body.esubtitle3, 
              "eicon3": req.body.eicon3, 
              "edescription3": req.body.edescription3,
              "esubtitle4":req.body.esubtitle4, 
              "eicon4": req.body.eicon4, 
              "edescription4": req.body.edescription4, 
              "eimage": req.body.eimage
          },
          "image": "store-color-borde.png",
          "category": ["Oro", "Plata", "Bronce"],
          "categoryImage": ["plan-oro.png","plan-plata.png","plan-bronce.png"],
          "price": ["6999", "1999", "799"],
          "benefits": {
              "costoTransaccion": ["0.5%", "1%", "2%"],
               "a":[true, true, true],
               "b": [true, true, true],
               "c":[true, true, true],
               "d": [true, true, true],
               "e": [true, true, true],
               "f": [true, true, true],
               "g": [true, true, true],
               "h": [true, true, true],
               "i": [true, true, true],
               "j": [true, true, true],
               "k": [true, true, true],
               "l": [true, true, true],
               "m": [true, true, true],
               "n": [true, true, true],
               "o": [true, true, true],
               "p": [true, true, true],
               "q": [true, true, true],
               "r": [true, true, true],
               "s": [true, true, true],
               "t": [true, true, true],
               "u": [true, true, false],
               "v": [true, true, false],
               "w": [true, false, false],
               "x": [true, false, false],
               "cantidadSecciones": [20, 10, 5],
               "Suscribirse": [6999, 1999, 799]
              }
      });
      
         const productsJSON = JSON.stringify(products);
         fs.writeFileSync(productsDir, productsJSON);

        res.redirect('/products');
        },
    edicion: function(req, res, next) {
      res.render('./products/edit', {productToEdit: products[req.params.id -1]});
    },
    editor: function(req, res, next) {
    /*----Actualizando los datos de formularios, en la variable products----*/
    products[req.params.id -1].name = req.body.name;
		products[req.params.id -1].price = req.body.price;
		products[req.params.id -1].category = req.body.category;
    products[req.params.id -1].description = req.body.description;
    
    /*----Guardando imagen nueva y cambios en productos data base----*/
		products[req.params.id -1].image = req.file.filename;
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