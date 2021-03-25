const db = require('../../database/models')



module.exports = {
    listado: function(req, res, next){
        db.User.findAll({
            include: [{
                association: "Categories"
            }]
        })
        .then((users) => {
            let usuarios = []
            users.forEach(user => {
                let informacion = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    image: user.image,
                    product_id: user.product_id,
                    category_id: user.category_id,
                    category_info: user.Categories,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                    deleted_at: user.deleted_at

                }
                usuarios.push(informacion)
            });
           var listado = {
               meta: {status:200, total: users.length}, 
               data: usuarios
           }
           res.json(listado)
        })
        .catch(err => {
            console.log(err)
        })
    },
    detalle: function (req, res, next) {
        db.User.findByPk(req.params.id, {
            include: [{
            association: "Categories"
        }]
    })
        .then((user) => {
            var listado = {
                meta: {status:200, ID: user.id}, 
                data: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    image: user.image,
                    product_id: user.product_id,
                    category_id: user.category_id,
                    category_info: user.Categories,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                    deleted_at: user.deleted_at

                }
            }
            res.json(listado)
        })
        .catch(err => {
            res.send(err)
        })
    }
   
}