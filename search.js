var fs = require('fs');
var request = require('request');
var cheerio = require("cheerio");
var addressable = require("addressable");
var uuid = require('uuid/v1');

exports.crwalImages = function(word, callback) {
  var aurl = addressable.parse("https://www.google.co.jp/search");
  aurl.query = {q: word + " 料理", tbm: "isch", start: 1, ijn: 1};
  request(aurl.toString(), function (error, response, body) {
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
            id: uuid(),
            image: domUrl.query.imgurl,
            title: domMeta[i].title || "",
            description: domMeta[i].description || ""
          });
        }
      }
    });
    callback(results);
  });
}