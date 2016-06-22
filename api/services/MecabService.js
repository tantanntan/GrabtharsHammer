/**
 * Service Macab 
 * 
 * */

var async = require('async');

var Mecab = require('mecab-async');
var command = "mecab";
var mecab = new Mecab();

Mecab.command="mecab";

module.exports = {
  message: function( text, cb ){
    var yomigana = "";
    var yomenai = false;
    var yomenaicnt = 0;
    mecab.parse ( text,
      function(err,wordList){
//        console.log(async);
        async.forEach( wordList, function(word,next){
            if( ! word[9] ){ yomenai = true; yomenaicnt++;}
            yomigana += word[9] ? word[9] : "ホニャ・・";
            next();
          },function(err){
            cb( yomenai, yomigana, yomenaicnt );
          }
      );
    });
  },
  sanitize: function(text){
    if(! text){
      return '';
    }
      return this.stripNewLine(text);
  },
  stripNewLine: function(text){
    return text.replace(/\n$/, '');
  }
};