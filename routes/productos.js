var express = require('express');
var router = express.Router();

/* Rutas a Productos */
router.get('/', function(req, res, next) {
  res.render('producto'/*, { title: 'Express' }*/);
});

router.get('/:id', function(req, res, next) {
  if (req.params.id == 1) {
    res.render('producto'/*, { title: 'Express' }*/);
  } else if (req.params.id == 2) {
    res.render('producto2'/*, { title: 'Express' }*/);
  } else {
    res.send('No tenemos un producto con ese ID');
  }
  });

module.exports = router;
