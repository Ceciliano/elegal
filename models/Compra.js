var mongoose = require('mongoose');
path = require('path');

var Produto = require(path.resolve('./models/Produto.js'));

var CategoriaSchema = new mongoose.Schema({
  nome: String,
  ativo: Boolean,
  descricao: String,
  produto: [Produto]
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
