'use strict'

const mongoose = require('mongoose');
const path     = require('path');

var UsuarioSchema = new mongoose.Schema({
  login	: String,
  email	: String,
  pass	: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
