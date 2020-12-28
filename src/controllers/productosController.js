const fs = require('fs');
const path = require('path');
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
      products.push({
        "id": products.length + 1,
        "name": req.body.name,
        "price": req.body.price,
        "discount": req.body.discount,
        "category": req.body.category,
        "description": req.body.description,
        "image": req.file.filename,
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