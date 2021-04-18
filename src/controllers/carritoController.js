const db = require('../database/models');

const carritoController = {
    carrito: function(req, res, next) {

      if (req.session.user != undefined) {
        db.Cart.findAll({
          where: { user_id: req.session.user.id },
          include: [{
            association: "Products"
          }, {
            association: "Categories"
          }]
      }).then(carts => {

        res.render('carrito', {carts: carts});
      })
      .catch(err => console.log(err))
        
      } else {
        res.redirect('/users/login')
      }
        
    },
    add: function (req, res, next) {
      if (req.session.user != undefined) {
      
        db.Cart.create({

          user_id: req.session.user.id,
          product_id: req.params.productID,
          category_id: req.params.categoryID

      }).then(() => {

        res.redirect('/carrito');

      }).catch((err) => {
          console.log(err)
      })
        
      } else {
        res.redirect('/users/login')
      }
    }
}

module.exports = carritoController;