var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

//サーバーの立ち上げ
var http = require('http');

//指定したポートにきたリクエストを受け取れるようにする
var server = http.createServer(app).listen(port, function () {
  console.log('Server listening at port %d', port);
});

var search = require(__dirname + '/../search.js');

app.get('/', function(req, res){
  search.crwalImages('かえる', function(results){
    console.log(results);
  });
  res.sendFile(__dirname + '/index.html');
});