const fs = require('fs');
const path = require('path');
const productsDir = path.join(__dirname, '..', 'data', 'products.json');
const products = JSON.parse(fs.readFileSync(productsDir, 'utf-8'));

const indexController = {
    home: function(req, res, next) {
        res.render('index', {products: products});
      }
}

module.exports = indexController;