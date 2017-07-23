'use strict'

const express       = require('express');
const router        = express.Router();
const lojaGenerator = require('../fileGenerators/loja');
const lojaModel     = require('../../../models/Loja');
const evh           = require('express-vhost');
const dns           = require('dns');

/* GET /lojas listing. */
router.get('/', function(req, res, next) {
    lojaModel.find(function (err, lojas) {
      if (err) return next(err);
      res.json(lojas);
    });
});

/* GET /lojas/id */
router.get('/:id', function(req, res, next) {
    lojaModel.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* POST /lojas */
router.post('/', function(req, res, next) {
  const url = lojaGenerator.formataURL(req.body.nome);
  req.body.url = url;
  lojaModel.create(req.body, function (err, post) {
    if (err) return next(err);
    lojaGenerator.criarDiretorio(url, function(err){
      if (err) return next(err);
        res.json(post);
    });

    evh.register(url+'.localhost', require('../lojas/'+ url));
  });
});

/* PUT /lojas/:id */
router.put('/:id', function(req, res, next) {
  req.body.url = lojaGenerator.formataURL(req.body.nome);
    lojaModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

router.delete('/:id', function(req, res, next) {

  console.log('ID da Loja recebido: ' + req.params.id);

  lojaModel.findById(req.params.id, function (err, loja){
     if(err) return next(err);
         lojaGenerator.deletarDiretorio(loja.url, function(err) {
           lojaModel.findByIdAndRemove(loja._id, req.body, function (err, post) {
             if (err) return next(err);
                console.log('Deletou a loja ' + loja._id);
                console.log('removendo host ' +loja.url+'.localhost');
                delete evh.hostDictionary[loja.url+'.localhost'];
                res.json(post);
             });
         });
     });
});

module.exports = router;
