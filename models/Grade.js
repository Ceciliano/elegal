var mongoose = require('mongoose');
path = require('path');

var GradeSchema = new mongoose.Schema({
  nome: String,
  variacoes: String,
  loja: {type: mongoose.Schema.Types.ObjectId, ref: 'Loja'}
});

module.exports = mongoose.model('Grade', GradeSchema);
