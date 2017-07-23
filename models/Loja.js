var mongoose = require('mongoose');
path = require('path');


var LojaSchema = new mongoose.Schema({
  nome: String,
  url: String,
  ativo: Boolean,
  descricao: String
});

module.exports = mongoose.model('Loja', LojaSchema);
