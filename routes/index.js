var express = require('express');
var autenticacao = require('../utils/autenticacao');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'e-Legal' });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/admin', function(req, res, next) {
    autenticacao.autenticar(req, res, 'admin/pages/index');
});

router.get('/admin/marcas', function(req, res, next) {
    autenticacao.autenticar(req, res, 'admin/pages/marca');
});

router.get('/admin/categorias', function(req, res, next) {
    autenticacao.autenticar(req, res, 'admin/pages/categoria');
});

router.get('/admin/clientes', function(req, res, next) {
    autenticacao.autenticar(req, res, 'admin/pages/cliente');
});

router.get('/admin/grades', function(req, res, next) {
    autenticacao.autenticar(req, res, 'admin/pages/grade');
});

module.exports = router;
