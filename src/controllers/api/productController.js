const db = require('../../database/models')


module.exports = {
    listado: function(req, res, next){
        db.Product.findAll({
            include: [{
                association: "Categories"
            }]
        })
        .then((products) => {
           var listado = {
               meta: {status:200, total: products.length}, 
               data: products
           }
           res.json(listado)
        })
        .catch(err => {
            console.log(err)
        })
    }
}