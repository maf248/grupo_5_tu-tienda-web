const fs = require('fs');
const path = require('path');

const productsDir = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsDir, 'utf-8'));

const db = require('../database/models');

const indexController = {
    home: function(req, res, next) {
      db.Product.findAll({
        include: [
          {association: "Sections"},
          {association: "Categories",
        include: [
          {association: "Benefits"}
        ]
      }
        ]
      })
      .then((products) => {
        res.send(products)
      })
      .catch(err => {
        res.send(err)
      })
        
      },
    test: function(req, res, next) {
      db.Product.findAll({
        include: [
          {association: "Categories",
        include: [
          {association: "Benefits"}
        ]
      }
        ]
      })
      .then((productos) => {
        res.send(productos)
      })
      .catch(err => {
        res.send(err)
      })
    }
}

module.exports = indexController;