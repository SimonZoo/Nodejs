'use strict';

var http = require('http');

var server = http.createServer(function (request, response) {
    console.log(request.method + ':' + request.url);
    //http响应200写入response，同时设置content type
    response.writeHead(200, {'Content-Type':'text/html'});
    //将http响应的HTML内容写入response
    response.end('<h1>OK, You are here now.</h1>');
});

server.listen(8080);//服务器监听8080端口

console.log('Server is running at http://127.0.0.1:8080/');