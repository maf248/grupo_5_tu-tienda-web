const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const productsDir = path.join(__dirname, '..', 'data', 'products.json');

const productosController = {
    detalle: function(req, res, next) {
        if (req.params.id == 1) {
          res.render('./products/producto'/*, { title: 'Express' }*/);
            } else if (req.params.id == 2) {
          res.render('./products/producto2'/*, { title: 'Express' }*/);
            } else {
          res.send('No tenemos un producto con ese ID');
            }
        },
    listado: function(req, res, next) {
          res.render('./products/listado-productos'/*, { title: 'Express' }*/);   
        },
    creacion: function(req, res, next) {
          res.render('./products/create'/*, { title: 'Express' }*/); 
        },
    creador: function(req, res, next) {
      products.push({
        "id": products.length + 1,
        "name": req.body.name,
        "price": req.body.price,
        "discount": req.body.discount,
        "category": req.body.category,
        "description": req.body.description,
        //"image": req.file.filename,
         });
         console.log(req.body);
         const productsJSON = JSON.stringify(products);
         fs.writeFileSync(productsDir, productsJSON);


        res.send('Gracias por crear el producto');
        //res.redirect('/products');
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
    }
      }
module.exports = productosController;