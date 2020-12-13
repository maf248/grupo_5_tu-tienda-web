const usersController = {
    main: function(req, res, next) {
            if (req.params.id == 'login') {
                res.render('./users/login');
            } else if (req.params.id == 'registro') {
                res.render('./users/registro');
            } else {
          res.send('No tenemos un producto con ese ID');
            }
        } 
}

module.exports = usersController;