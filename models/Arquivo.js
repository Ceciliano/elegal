var mongoose = require('mongoose');
path = require('path');

var ArquivoSchema = new mongoose.Schema({
    data: String,
    nome: String,
    tamanho: Number,
    tipo: String,
    loja: {type: mongoose.Schema.Types.ObjectId, ref: 'Loja'}
});

module.exports = mongoose.model('Arquivo', ArquivoSchema);
