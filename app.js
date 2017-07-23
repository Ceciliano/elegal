var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('./bin/database');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var evh = require('express-vhost');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var produtos = require('./routes/produtos');
var categorias = require('./routes/categorias');
var marcas = require('./routes/marcas');
var grades = require('./routes/grades');
var arquivos = require('./routes/arquivos');
var Loja = require('./models/Loja.js');
var usuarios = require('./routes/usuarios');

//===========modulos==========
var lojas = require('./modulos/elegal-lojas');
var web = require('./modulos/elegal-web');
//================================

var app = express();

// Load mongoose
var uri = process.env.MONGODB_URI || 'mongodb://localhost/eLegal';
mongoose.connect(uri);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(evh.vhost(app.enabled('trust proxy')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true
	})
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'modulos')));

app.use('/', routes);
app.use('/users', users);
app.use('/lojas', lojas);
app.use('/web', web);
app.use('/produtos', produtos);
app.use('/categorias', categorias);
app.use('/marcas', marcas);
app.use('/grades', grades);
app.use('/arquivos', arquivos);
app.use('/usuarios', usuarios);

Loja.find(function (err, lojas) {
  if (err) return next(err);
  for(var i in lojas){
       var url = lojas[i].url;
       console.log("Mapeando a loja: ====== " + url + " ========");
       try {
         evh.register(url+'.localhost', require('./modulos/elegal-lojas/lojas/'+ url));
       } catch (err) {
         console.error("Erro ao mapear a loja:" + url + " -> " + err);
       }
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
