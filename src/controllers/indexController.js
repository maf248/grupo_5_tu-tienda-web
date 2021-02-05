const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsDir, 'utf-8'));

const db = require('../database/models');

const indexController = {
    home: function(req, res, next) {
        res.render('index', {products: products});
      },
    test: function(req, res, next) {
      db.User.findAll()
      .then((usuarios) => {
        res.send(usuarios)
      })
      .catch(err => {
        res.send(err)
      })
    }
}

module.exports = indexController;