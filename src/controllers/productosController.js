const fs = require('fs');
const path = require('path');
const { Recoverable } = require('repl');
const productsDir = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsDir, 'utf-8'));

/*----- Acá generamos un indice alfabetico de Benefits para luego utilizar al recorrer los beneficios A, B, C....etc -----*/
const indexBenefits = "abcdefghijklmnopqrstuvwx";

const productosController = {
    detalle: function(req, res, next) {

        /*-----Acá pasamos la vista de producto según  el id -----*/
        if ( req.params.id - 1 < products.length ) {
          res.render('./products/producto', { product: products[req.params.id -1] });   
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
      /*----Acá creamos un objeto que guardará el nombre de archivo subico, correspondiente a cada input----*/
      var imageDir = {

      };
      /*----Acá filtramos para que cada nombre de archivo se guarde en donde corresponde----*/
      req.files.forEach (file => {
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
       /*----Acá guardamos toda la información del producto nuevo----*/
      products.push(
         {
          "id": products.length + 1,
          "name": req.body.name,
          "type": req.body.type,
          "titleBanner1": req.body.titleBanner1,
          "subtitleBaner1": req.body.subtitleBanner1,
          "seccion1": {
              "atitle": req.body.atitle, 
              "aicon1": imageDir.aicon1, 
              "asubtitle1":req.body.asubtitle1, 
              "adescription1":req.body.adescription1,
              "asubtitle2":req.body.asubtitle2, 
              "aicon2": imageDir.aicon2, 
              "adescription2": req.body.adescription2, 
              "asubtitle3":req.body.asubtitle3, 
              "aicon3": imageDir.aicon3, 
              "adescription3": req.body.adescription3, 
              "asubtitle4":req.body.asubtitle4, 
              "aicon4": imageDir.aicon4, 
              "adescription4": req.body.adescription4, 
              "aimage": imageDir.aimage
          }, 
          "seccion2": {
              "btitle": req.body.btitle, 
              "bicon1": imageDir.bicon1, 
              "bsubtitle1":req.body.bsubtitle1, 
              "bdescription1":req.body.bdescription1, 
              "bsubtitle2":req.body.bsubtitle2, 
              "bicon2": imageDir.bicon2,  
              "bdescription2": req.body.bdescription2, 
              "bsubtitle3":req.body.bsubtitle3, 
              "bicon3": imageDir.bicon3, 
              "bdescription3": req.body.bdescription3,
              "bsubtitle4":req.body.bsubtitle4, 
              "bicon4": imageDir.bicon4, 
              "bdescription4": req.body.bdescription4, 
              "bimage": imageDir.bimage
          }, 
          "seccion3": {
              "ctitle": req.body.ctitle, 
              "cicon1": imageDir.cicon1, 
              "csubtitle1":req.body.csubtitle1, 
              "cdescription1":req.body.cdescription1,
              "csubtitle2":req.body.csubtitle2, 
              "cicon2": imageDir.cicon2, 
              "cdescription2": req.body.cdescription2, 
              "csubtitle3":req.body.csubtitle3, 
              "cicon3": imageDir.cicon3, 
              "cdescription3": req.body.cdescription3, 
              "csubtitle4":req.body.csubtitle4, 
              "cicon4": imageDir.cicon4, 
              "cdescription4": req.body.cdescription4, 
              "cimage": imageDir.cimage 
          },
          "seccion4": {
              "dtitle": req.body.dtitle, 
              "dicon1": imageDir.dicon1, 
              "dsubtitle1":req.body.dsubtitle1, 
              "ddescription1":req.body.ddescription1, 
              "dsubtitle2":req.body.dsubtitle2, 
              "dicon2": imageDir.dicon2, 
              "ddescription2": req.body.ddescription2, 
              "dsubtitle3":req.body.dsubtitle3, 
              "dicon3": imageDir.dicon3, 
              "ddescription3": req.body.ddescription3, 
              "dsubtitle4":req.body.dsubtitle4, 
              "dicon4": imageDir.dicon4, 
              "ddescription4": req.body.ddescription4, 
              "dimage": imageDir.dimage
          },
          "seccion5": {
              "etitle": req.body.etitle, 
              "eicon1": imageDir.eicon1, 
              "esubtitle1":req.body.esubtitle1, 
              "edescription1":req.body.edescription1, 
              "esubtitle2":req.body.esubtitle2, 
              "eicon2": imageDir.eicon2,
              "edescription2": req.body.edescription2, 
              "esubtitle3":req.body.esubtitle3, 
              "eicon3": imageDir.eicon3, 
              "edescription3": req.body.edescription3,
              "esubtitle4":req.body.esubtitle4, 
              "eicon4": imageDir.eicon4, 
              "edescription4": req.body.edescription4, 
              "eimage": imageDir.eimage
          },
          "image": imageDir.image,
          "category": [req.body.category1, req.body.category2, req.body.category3],
          "categoryImage": [imageDir.categoryImage1,imageDir.categoryImage2,imageDir.categoryImage3],
          "price": [req.body.price[0], req.body.price[1], req.body.price[2]],
          "benefits": {
              "costoTransaccion": ["Costo por transacción", req.body.costoTransaccion[1], req.body.costoTransaccion[2], req.body.costoTransaccion[3]],
              
               "cantidadSecciones": ["Cantidad de secciones", req.body.cantidadSecciones1 , req.body.cantidadSecciones2, req.body.cantidadSecciones3]
              }
              
      });
      /*-----Acá nos aseguramos que no genere las propiedades de Benefits, en caso de no tener nombre el beneficio (campo input vacio)-----*/
      for (let i = 0; i < indexBenefits.length; i++) {
        if (req.body[indexBenefits[i]][0] != "") {
          products[products.length -1].benefits[indexBenefits[i]] = [req.body[indexBenefits[i]][0], req.body[indexBenefits[i]][1], req.body[indexBenefits[i]][2], req.body[indexBenefits[i]][3]];
          }
        
        }
         const productsJSON = JSON.stringify(products);
         fs.writeFileSync(productsDir, productsJSON);

        res.redirect('/products');
        },
    edicion: function(req, res, next) {
      res.render('./products/edit', {productToEdit: products[req.params.id -1], indexBenefits: indexBenefits});
    },
    editor: function(req, res, next) {
    /*----Actualizando los datos de formularios, en la variable products----*/

                    /*----Generales----*/
    products[req.params.id -1].name = req.body.name;
    products[req.params.id -1].type = req.body.type;
    products[req.params.id -1].titleBanner1 = req.body.titleBanner1;
    products[req.params.id -1].subtitleBaner1 = req.body.subtitleBaner1;
    products[req.params.id -1].price = [req.body.price[0], req.body.price[1], req.body.price[2]];
    products[req.params.id -1].category = [req.body.category1, req.body.category2, req.body.category3];
    products[req.params.id -1].categoryImage = [req.body.categoryImage1,req.body.categoryImage2,req.body.categoryImage3];
    products[req.params.id -1].description = req.body.description;
                    /*----Sección 1----*/
    products[req.params.id -1].seccion1.atitle = req.body.atitle;
    products[req.params.id -1].seccion1.aicon1 = req.body.aicon1;
    products[req.params.id -1].seccion1.asubtitle1 = req.body.asubtitle1;
    products[req.params.id -1].seccion1.adescription1 = req.body.adescription1;
    products[req.params.id -1].seccion1.asubtitle2 = req.body.asubtitle2;
    products[req.params.id -1].seccion1.aicon2 = req.body.aicon2;
    products[req.params.id -1].seccion1.adescription2 = req.body.adescription2;
    products[req.params.id -1].seccion1.asubtitle3 = req.body.asubtitle3;
    products[req.params.id -1].seccion1.aicon3 = req.body.aicon3;
    products[req.params.id -1].seccion1.adescription3 = req.body.adescription3;
    products[req.params.id -1].seccion1.asubtitle4 = req.body.asubtitle4;
    products[req.params.id -1].seccion1.adescription4 = req.body.adescription4;
    products[req.params.id -1].seccion1.aimage = req.body.aimage;
                    /*----Sección 2----*/
    products[req.params.id -1].seccion2.btitle = req.body.btitle;
    products[req.params.id -1].seccion2.bicon1 = req.body.bicon1;
    products[req.params.id -1].seccion2.bsubtitle1 = req.body.bsubtitle1;
    products[req.params.id -1].seccion2.bdescription1 = req.body.bdescription1;
    products[req.params.id -1].seccion2.bsubtitle2 = req.body.bsubtitle2;
    products[req.params.id -1].seccion2.bicon2 = req.body.bicon2;
    products[req.params.id -1].seccion2.bdescription2 = req.body.bdescription2;
    products[req.params.id -1].seccion2.bsubtitle3 = req.body.bsubtitle3;
    products[req.params.id -1].seccion2.bicon3 = req.body.bicon3;
    products[req.params.id -1].seccion2.bdescription3 = req.body.bdescription3;
    products[req.params.id -1].seccion2.bsubtitle4 = req.body.bsubtitle4;
    products[req.params.id -1].seccion2.bicon4 = req.body.bicon4;
    products[req.params.id -1].seccion2.bdescription4 = req.body.bdescription4;
    products[req.params.id -1].seccion2.bimage = req.body.bimage;
                    /*----Sección 3----*/
    products[req.params.id -1].seccion3.ctitle = req.body.ctitle;
    products[req.params.id -1].seccion3.cicon1 = req.body.cicon1;
    products[req.params.id -1].seccion3.csubtitle1 = req.body.csubtitle1;
    products[req.params.id -1].seccion3.cdescription1 = req.body.cdescription1;
    products[req.params.id -1].seccion3.csubtitle2 = req.body.csubtitle2;
    products[req.params.id -1].seccion3.cicon2 = req.body.cicon2;
    products[req.params.id -1].seccion3.cdescription2 = req.body.cdescription2;
    products[req.params.id -1].seccion3.csubtitle3 = req.body.csubtitle3;
    products[req.params.id -1].seccion3.cicon3 = req.body.cicon3;
    products[req.params.id -1].seccion3.cdescription3 = req.body.cdescription3;
    products[req.params.id -1].seccion3.csubtitle4 = req.body.csubtitle4;
    products[req.params.id -1].seccion3.cicon4 = req.body.cicon4;
    products[req.params.id -1].seccion3.cdescription4 = req.body.cdescription4;
    products[req.params.id -1].seccion3.cimage = req.body.cimage;
                    /*----Sección 4----*/
    products[req.params.id -1].seccion4.dtitle = req.body.dtitle;
    products[req.params.id -1].seccion4.dicon1 = req.body.dicon1;
    products[req.params.id -1].seccion4.dsubtitle1 = req.body.dsubtitle1;
    products[req.params.id -1].seccion4.ddescription1 = req.body.ddescription1;
    products[req.params.id -1].seccion4.dsubtitle2 = req.body.dsubtitle2;
    products[req.params.id -1].seccion4.dicon2 = req.body.dicon2;
    products[req.params.id -1].seccion4.ddescription2 = req.body.ddescription2;
    products[req.params.id -1].seccion4.dsubtitle3 = req.body.dsubtitle3;
    products[req.params.id -1].seccion4.dicon3 = req.body.dicon3;
    products[req.params.id -1].seccion4.ddescription3 = req.body.ddescription3;
    products[req.params.id -1].seccion4.dsubtitle4 = req.body.dsubtitle4;
    products[req.params.id -1].seccion4.dicon4 = req.body.dicon4;
    products[req.params.id -1].seccion4.ddescription4 = req.body.ddescription4;
    products[req.params.id -1].seccion4.dimage = req.body.dimage;
                    /*----Sección 5----*/
    products[req.params.id -1].seccion5.etitle = req.body.etitle;
    products[req.params.id -1].seccion5.eicon1 = req.body.eicon1;
    products[req.params.id -1].seccion5.esubtitle1 = req.body.esubtitle1;
    products[req.params.id -1].seccion5.edescription1 = req.body.edescription1;
    products[req.params.id -1].seccion5.esubtitle2 = req.body.esubtitle2;
    products[req.params.id -1].seccion5.eicon2 = req.body.eicon2;
    products[req.params.id -1].seccion5.edescription2 = req.body.edescription2;
    products[req.params.id -1].seccion5.esubtitle3 = req.body.esubtitle3;
    products[req.params.id -1].seccion5.eicon3 = req.body.eicon3;
    products[req.params.id -1].seccion5.edescription3 = req.body.edescription3;
    products[req.params.id -1].seccion5.esubtitle4 = req.body.esubtitle4;
    products[req.params.id -1].seccion5.eicon4 = req.body.eicon4;
    products[req.params.id -1].seccion5.edescription4 = req.body.edescription4;
    products[req.params.id -1].seccion5.eimage = req.body.eimage;
                /*----Benefits----*/
    products[req.params.id -1].benefits.costoTransaccion = ["Costo por transacción", req.body.costoTransaccion[1], req.body.costoTransaccion[2], req.body.costoTransaccion[3]]
    products[req.params.id -1].benefits.cantidadSecciones = ["Cantidad de secciones", req.body.cantidadSecciones1 , req.body.cantidadSecciones2, req.body.cantidadSecciones3]

    for (let i=0; i < indexBenefits.length; i++) {
      products[req.params.id -1].benefits.indexBenefits[i] = [req.body.indexBenefits[i][0], req.body.indexBenefits[i][1], req.body.indexBenefits[i][2], req.body.indexBenefits[i][3]];
    };


    /*----Acá termina la actualización de datos de formularios, en la variable products----*/

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