const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html')
});
app.get('/registro', function (req, res) {
    res.sendFile(__dirname + '/views/registro.html')
});
app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/views/login.html')
});
app.get('/carrito', function (req, res) {
    res.sendFile(__dirname + '/views/carrito.html')
});
app.get('/producto', function (req, res) {
    res.sendFile(__dirname + '/views/producto.html')
});
app.get('/producto2', function (req, res) {
    res.sendFile(__dirname + '/views/producto2.html')
});

app.listen(3000, function () {
    console.log('Para ver el sitio ingresa a http://localhost:3000')
});

app.get('*', function(req, res) {
    path = require('path')
    let reqPath = path.join(__dirname, '../')
    res.sendFile(reqPath + req.url)
});