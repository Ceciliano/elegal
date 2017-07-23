'use strict'

const express = require('express');
const Marca = require('../models/Marca');
const Arquivo = require('../models/Arquivo');
const router  = express.Router();

router.get('/:idLoja', function(req, res) {
  Marca.find({loja: req.params.idLoja}, function (err, marcas) {
         if (err) throw err;
            res.json(marcas);
        });
    });

router.get('/:_id/:idLoja', function(req, res) {
    let query = {_id: req.params._id, loja: req.params.idLoja};
    Marca.find(query, function(err, marca) {
      if (err) throw err;
      Arquivo.findOne({_id: marca.logo}, function(err, arquivo){
              if(err) console.log('Erro ao buscar arquivo de logo.');
              marca.logo = arquivo;
              res.json(marca);
          });
      });
});

router.post('/', function(req, res) {
  Marca.create(req.body, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
});

router.put('/:_id', function(req, res) {
  Marca.findByIdAndUpdate(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:_id', function(req, res) {
  Marca.findByIdAndRemove(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
