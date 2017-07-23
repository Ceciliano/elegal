'use strict'

const fsExtra        = require('fs-extra');
const fs             = require('fs');
const path           = require('path');
const path_template  = path.resolve(__dirname,'../template');
const path_public    = path.resolve(__dirname,'../lojas');

const loja = {

    criarDiretorio: function(url, callback) {
      console.log("Inicio da criacao do diretorio: " + path_public + '/' + url);
      if (!fs.existsSync(path_public + '/' + url)) {
        try {
            fsExtra.copySync(path_template, path_public + '/' + url, callback());
        } catch (err) {
            console.error(err);
        }
      }
    },

    deletarDiretorio: function(url, callback) {
      console.log("Inicio da delecao do diretorio: " + path_public + '/' + url);
      if (fs.existsSync(path_public + '/' + url)) {
        try {
            fsExtra.remove(path_public + '/' + url, callback());
        } catch (err) {
            console.error(err);
        }
      }
    },

    formataURL: function(nome) {
        return removerAcentos(nome.toLowerCase().replace(/\s+/g, ''));
    }
};

function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
		e : /[\xE8-\xEB]/g,
		i : /[\xEC-\xEF]/g,
		o : /[\xF2-\xF6]/g,
		u : /[\xF9-\xFC]/g,
		c : /\xE7/g,
		n : /\xF1/g
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}

module.exports = loja;
