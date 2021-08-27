const db = require('../../database/models')


module.exports = {
    listado: function(req, res, next){
        db.Product.findAll({
            include: [{
                association: "Categories"
            }]
        })
        .then((products) => {
            var detalleProducto = []
            var cantidadCategorias = {}
            products.forEach(product => {
                detalleProducto.push({
                    id: product.id,
                    url : `http://grupo-5-tu-tienda-web.herokuapp.com/api/products/${product.id}`,
                    name: product.name,
                    type: product.type,
                    title_banner: product.title_banner,
                    subtitle_banner: product.subtitle_banner,
                    image: product.image,
                    created_at: product.created_at,
                    Categories: product.Categories,
                    
                })
                product.Categories.forEach(category =>{
                    var keys = Object.keys(cantidadCategorias)
                    if(keys.includes(category.name)){
                        cantidadCategorias[category.name] +=1

                    }else{
                        cantidadCategorias[category.name] =1
                    }
                    
                    
                })
                
            });
           var listado = {
               meta: {
                status:200,
                total: products.length,
                totalCategory: cantidadCategorias
                }, 
               data: detalleProducto
           }
           res.json(listado)
        })
        .catch(err => {
            console.log(err)
        })
    },
    detalle: function (req, res, next) {
        db.Product.findByPk(req.params.id, {
            include: [{
                    association: "Sections",
                    include: [{
                        association: "Contents"
                    }]
                },
                {
                    association: "Categories"
                }
            ]
        })
        .then((product) => {
            var listado = {
                meta: {status:200, ID: product.id}, 
                data: {
                    id: product.id,
                    name: product.name,
                    type: product.type,
                    title_banner: product.title_banner,
                    subtitle_banner: product.subtitle_banner,
                    image : `http://grupo-5-tu-tienda-web.herokuapp.com/images/Producto-${product.id}/${product.image}`,
                    created_at: product.created_at,
                    Categories: product.Categories,
                    Sections: product.Sections
                }
            }
            res.json(listado)
        })
        .catch(err => {
            res.send(err)
        })
    }
   
}