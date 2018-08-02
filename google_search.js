var request = require('request');
var cheerio = require("cheerio");
var addressable = require("addressable");

var GoogleSearch = function(){
  this.searchImages = function(word, options = {}) {
    return new Promise((resolve, reject) => {
      var aurl = addressable.parse("https://www.google.co.jp/search");
      aurl.query = Object.assign({q: word, tbm: "isch", start: 1, ijn: 1}, options);
      request(aurl.toString(), function (error, response, body) {
        if(error){
          reject(error);
          return;
        }
        var $ = cheerio.load(body)
        var domMeta = {};
        $(".rg_meta").each(function(i, elem) {
          if(elem.children[0] && elem.children[0].data){
            var jsonObject = JSON.parse(elem.children[0].data);
            domMeta[i] = {title: jsonObject.st, description: jsonObject.pt}
          }
        });
        var results = [];
        $('a').each(function(i, elem) {
          if(elem && elem.attribs && elem.attribs.href){
            var domUrl = addressable.parse(elem.attribs.href);
            if(domUrl.query.imgurl && domUrl.query.imgrefurl){
              results.push({
                url: domUrl.query.imgrefurl,
                image_url: domUrl.query.imgurl,
                title: domMeta[i].title || "",
                description: domMeta[i].description || ""
              });
            }
          }
        });
        resolve(results);
      });
    });
  }
}

module.exports = GoogleSearch;