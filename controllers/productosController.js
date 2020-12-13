const productosController = {
    detalle: function(req, res, next) {
        if (req.params.id == 1) {
          res.render('producto'/*, { title: 'Express' }*/);
            } else if (req.params.id == 2) {
          res.render('producto2'/*, { title: 'Express' }*/);
            } else {
          res.send('No tenemos un producto con ese ID');
            }
        },
    listado: function(req, res, next) {
          res.render('listado-productos'/*, { title: 'Express' }*/);   
        },
    edicion: function(req, res, next ) {
          res.render('edicion-creacion-productos'/*, { title: 'Express' }*/); 
        },
      }
module.exports = productosController;