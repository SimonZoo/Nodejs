'use strict';

var fs = require('fs'),
    url = require('url'),
    path = require('path'),//path模块方便构造目录
    http = require('http');

var root = path.resolve(process.argv[2] || '.');//解析当前目录
console.log('Static root dir:' + root);

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);//组合完整路径 root/pathname
    fs.stat(filepath, function(err, stat) {
        if(!err && stat.isFile()) {
            console.log('200' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else {
            console.log('404' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');