'use strict'

const express = require('express');
const Grade = require('../models/Grade');
const router  = express.Router();


router.get('/:idLoja', function(req, res) {
  Grade.find({loja: req.params.idLoja}, function (err, grades) {
      if (err) throw err;
      res.json(grades);
    });
});

router.get('/:_id/:idLoja', function(req, res) {
    let query = {_id: req.params._id, loja: req.params.idLoja};
    Grade.findOne(query, function(err, grade) {
      if (err) throw err;
      console.log('Grade retornada: ' + grade);
      res.json(grade);
    });
});

router.post('/', function(req, res) {
  Grade.create(req.body, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
});

router.put('/:_id', function(req, res) {
  Grade.findByIdAndUpdate(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:_id', function(req, res) {
  Grade.findByIdAndRemove(req.params._id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
