var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var cors = require('cors');
var session = require('express-session'); 

const methodOverride =  require('method-override');

var indexRouter = require('./routes/index');
var carritoRouter = require('./routes/carrito');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var apiRouter = require('./routes/api/apiRouter');

var loginMiddleware = require('./middlewares/loginMiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({secret: "Mensaje secreto grupo 5", resave: false, saveUninitialized: true}));
app.use(loginMiddleware);

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/carrito', carritoRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.url = req.url;
  
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
