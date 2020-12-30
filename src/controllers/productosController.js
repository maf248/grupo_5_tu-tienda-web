const fs = require('fs');
const path = require('path');
const { Recoverable } = require('repl');
const productsDir = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsDir, 'utf-8'));

/*----- Acá filtramos el JSON en las diferentes categorías de producto -----*/
const tiendaWeb = products.filter( item => item.type == 'tiendaWeb' );
const paginaWeb = products.filter( item => item.type == 'paginaWeb' );

const indexBenefits = "abcdefghijklmnopqrstuvwx";

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
          res.render('./products/create', {indexBenefits: indexBenefits}); 
        },
    creador: function(req, res, next) {
      products.push(
         {
          "id": products.length + 1,
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
          "image": req.body.image,
          "category": [req.body.category1, req.body.category2, req.body.category3],
          "categoryImage": [req.body.categoryImage1,req.body.categoryImage2,req.body.categoryImage3],
          "price": [req.body.price[0], req.body.price[1], req.body.price[2]],
          "benefits": {
              "costoTransaccion": ["Costo por transacción", req.body.costoTransaccion[1], req.body.costoTransaccion[2], req.body.costoTransaccion[3]],

               "a":[req.body.a[0], req.body.a[1], req.body.a[2], req.body.a[3]],
               "b": [req.body.b[0], req.body.b[1], req.body.b[2], req.body.b[3]],
               "c":[req.body.c[0], req.body.c[1], req.body.c[2], req.body.c[3]],
               "d": [req.body.d[0], req.body.d[1], req.body.d[2], req.body.d[3]],
               "e": [req.body.e[0], req.body.e[1], req.body.e[2], req.body.e[3]],
               "f": [req.body.f[0], req.body.f[1], req.body.f[2], req.body.f[3]],
               "g": [req.body.g[0], req.body.g[1], req.body.g[2], req.body.g[3]],
               "h": [req.body.h[0], req.body.h[1], req.body.h[2], req.body.h[3]],
               "i": [req.body.i[0], req.body.i[1], req.body.i[2], req.body.i[3]],
               "j": [req.body.j[0], req.body.j[1], req.body.j[2], req.body.j[3]],
               "k": [req.body.k[0], req.body.k[1], req.body.k[2], req.body.k[3]],
               "l": [req.body.l[0], req.body.l[1], req.body.l[2], req.body.l[3]],
               "m": [req.body.m[0], req.body.m[1], req.body.m[2], req.body.m[3]],
               "n": [req.body.n[0], req.body.n[1], req.body.n[2], req.body.n[3]],
               "o": [req.body.o[0], req.body.o[1], req.body.o[2], req.body.o[3]],
               "p": [req.body.p[0], req.body.p[1], req.body.p[2], req.body.p[3]],
               "q": [req.body.q[0], req.body.q[1], req.body.q[2], req.body.q[3]],
               "r": [req.body.r[0], req.body.r[1], req.body.r[2], req.body.r[3]],
               "s": [req.body.s[0], req.body.s[1], req.body.s[2], req.body.s[3]],
               "t": [req.body.t[0], req.body.t[1], req.body.t[2], req.body.t[3]],
               "u": [req.body.u[0], req.body.u[1], req.body.u[2], req.body.u[3]],
               "v": [req.body.v[0], req.body.v[1], req.body.v[2], req.body.v[3]],
               "w": [req.body.w[0], req.body.w[1], req.body.w[2], req.body.w[3]],
               "x": [req.body.x[0], req.body.x[1], req.body.x[2], req.body.x[3]],
               "cantidadSecciones": ["Cantidad de secciones", req.body.cantidadSecciones1 , req.body.cantidadSecciones2, req.body.cantidadSecciones3]
              }
              
      });
      console.log(req.body)
         const productsJSON = JSON.stringify(products);
         fs.writeFileSync(productsDir, productsJSON);

        res.redirect('/products');
        },
    edicion: function(req, res, next) {
      res.render('./products/edit', {productToEdit: products[req.params.id -1], indexBenefits: indexBenefits});
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