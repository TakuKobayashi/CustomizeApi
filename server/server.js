var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

//サーバーの立ち上げ
var http = require('http');

//指定したポートにきたリクエストを受け取れるようにする
var server = http.createServer(app).listen(port, function () {
  console.log('Server listening at port %d', port);
});

var GoogleSearch = require(__dirname + '/../google_search.js');
var google_search = new GoogleSearch();

app.get('/', function(req, res){
  google_search.searchImages('かえる').then(function(results){
    console.log(results);
  });
  res.sendFile(__dirname + '/index.html');
});