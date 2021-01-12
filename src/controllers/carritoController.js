const carritoController = {
    carrito: function(req, res, next) {

      if (req.session.user != undefined) {
        res.render('carrito');
      } else {
        res.redirect('/users/login')
      }
        
    },
}

module.exports = carritoController;