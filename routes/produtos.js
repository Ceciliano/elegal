'use strict'

const express = require('express');
const Produto = require('../models/Produto');
const Loja = require('../models/Loja');
const router  = express.Router();


router.get('/', function(req, res) {
  Produto.find(function (err, produtos) {
      if (err) throw err;
      var countLojas = 0;
      produtos.forEach(function (produto) {
        Loja.findById(produto.loja)
                .exec(function (err, loja) {
                  if(err) throw err;
                  produto.loja = loja
                  countLojas++
                  if(countLojas === produtos.length){
                    res.json(produtos);
                  }
            })
        })
    });
});

router.get('/cadastroProduto', function(req, res) {
    res.render('admin/pages/cadastro_produto');
});

router.get('/listarProduto', function(req, res) {
    res.render('admin/pages/listaProduto');
});

router.get('/:_id/:idLoja', function(req, res) {
    let query = {_id: req.params._id, loja: req.params.idLoja};
    Produto.findOne(query)
      .exec(function(err, produto) {
        if (err) throw err;
        Loja.findById(produto.loja)
                .exec(function (err, loja) {
                  produto.loja = loja;
                  res.json(produto);
            });
      });
});

router.post('/', function(req, res) {
  Produto.create(req.body, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
});

router.put('/:_id', function(req, res) {
  Produto.findByIdAndUpdate(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:_id', function(req, res) {
  Produto.findByIdAndRemove(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
