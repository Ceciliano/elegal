'use strict'

const express = require('express');
const Categoria = require('../models/Categoria');
const router  = express.Router();


router.get('/:idLoja', function(req, res) {
  Categoria.find({loja: req.params.idLoja}, function (err, categorias) {
      if (err) throw err;
      res.json(categorias);
    });
});

router.get('/:_id/:idLoja', function(req, res) {
    let query = {_id: req.params._id, loja: req.params.idLoja};
    Categoria.findOne(query, function(err, categoria) {
      if (err) throw err;
      res.json(categoria);
    });
});

router.post('/', function(req, res) {
  Categoria.create(req.body, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
});

router.put('/:_id', function(req, res) {
  Categoria.findByIdAndUpdate(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:_id', function(req, res) {
  Categoria.findByIdAndRemove(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
