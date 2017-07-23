'use strict'

const mongoose = require('mongoose');
const path     = require('path');

var MarcaSchema = new mongoose.Schema({
  ativo: Boolean,
  destaque: Boolean,
  nome: String,
  descricao: String,
  logo: {type: mongoose.Schema.Types.ObjectId, ref: 'Arquivo'},
  loja: {type: mongoose.Schema.Types.ObjectId, ref: 'Loja'}
});

module.exports = mongoose.model('Marca', MarcaSchema);
