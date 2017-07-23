var mongoose = require('mongoose');

var ProdutoSchema = new mongoose.Schema({
  nome: String,
  ativo: Boolean,
  descricao: String,
  loja: {type: mongoose.Schema.Types.ObjectId, ref: 'Loja'},
  categorias: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}],
  marca: {type: mongoose.Schema.Types.ObjectId, ref: 'Marca'}
});

module.exports = mongoose.model('Produto', ProdutoSchema);
