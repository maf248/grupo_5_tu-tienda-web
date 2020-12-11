const usersController = {
    main: function(req, res, next) {
            if (req.params.id == 'login') {
                res.render('login');
            } else if (req.params.id == 'registro') {
                res.render('registro');
            } else {
          res.send('No tenemos un producto con ese ID');
            }
        } 
}

module.exports = usersController;