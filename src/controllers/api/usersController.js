const db = require('../../database/models')


module.exports = {
    listado: function(req, res, next){
        db.User.findAll({
            include: [{
                association: "Categories"
            }]
        })
        .then((users) => {
           var listado = {
               meta: {status:200, total: users.length}, 
               data: users
           }
           res.json(listado)
        })
        .catch(err => {
            console.log(err)
        })
    },
    detalle: function (req, res, next) {
        db.User.findByPk(req.params.id)
        .then((user) => {
            var listado = {
                meta: {status:200, ID: user.id}, 
                data: user
            }
            res.json(listado)
        })
        .catch(err => {
            res.send(err)
        })
    }
   
}