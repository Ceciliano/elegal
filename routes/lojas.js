var express = require('express');
var fsExtra = require('fs-extra');
var fs = require('fs');
var path = require('path');

var router = express.Router();

var Loja = require('../models/Loja.js');
var path_template = path.resolve(__dirname,'../template');
var path_public = path.resolve(__dirname,'../lojas');

function formataURL(nome) {
    return nome.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
               return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
          }).replace(/\s+/g, '');
}

function gerandoArquivos(url, posGeracao) {
       console.log("Vou criar o diretorio: " + path_public + '/' + url);
      if (!fs.exists(path_public + '/' + url)) {
        try {
            fsExtra.copy(path_template, path_public + '/' + url, posGeracao());
        } catch (err) {
            console.error(err);
        }
      }
}

function deletarArquivos(url, posDelete) {
      console.log("Vou deletar o diretorio: " + path_public + '/' + url);
      if (fs.exists(path_public + '/' + url)) {
        try {
            fsExtra.removeSync(path_public + '/' + url, posDelete());
        } catch (err) {
            console.error(err);
        }
      }
}

/* GET /lojas listing. */
router.get('/', function(req, res, next) {
  Loja.find(function (err, lojas) {
    if (err) return next(err);
    res.json(lojas);
  });
});

/* POST /lojas */
router.post('/', function(req, res, next) {
  req.body.url = formataURL(req.body.nome);

  gerandoArquivos(req.body.url, function (){
      Loja.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
  });
});

/* GET /lojas/id */
router.get('/:id', function(req, res, next) {
  Loja.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /lojas/:id */
router.put('/:id', function(req, res, next) {
  req.body.url = formataURL(req.body.nome);
  Loja.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /lojas/:id */
router.delete('/:id', function(req, res, next) {
 Loja.findById(req.params.id, function (err, loja){
    if(err) return next(err);
    deletarArquivos(loja.url, function (){
        Loja.findByIdAndRemove(loja._id, req.body, function (err, post) {
          if (err) return next(err);
          res.json(post);
            });
        });
    });
});

module.exports = router;
