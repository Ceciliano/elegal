'use strict'

const express = require('express');
const Arquivo = require('../models/Arquivo');
const router  = express.Router();


router.get('/:idLoja', function(req, res) {
  Arquivo.find({loja: req.params.idLoja}, function (err, arquivos) {
      if (err) throw err;
      res.json(arquivos);
    });
});

router.get('/:_id/:idLoja', function(req, res) {
    let query = {_id: req.params._id, loja: req.params.idLoja};
    Categoria.findOne(query, function(err, arquivo) {
      if (Arquivo) throw err;
      res.json(arquivo);
    });
});

router.post('/', function(req, res) {
  Arquivo.create(req.body, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
});

router.put('/:_id', function(req, res) {
  Arquivo.findByIdAndUpdate(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:_id', function(req, res) {
  Arquivo.findByIdAndRemove(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
