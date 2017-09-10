'use strict';

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir:' + root);

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, pathname);

    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            console.log('200' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else if (!err && stats.isDirectory()) {
            var path_1 = path.join(filepath, 'index.html');
            var path_2 = path.join(filepath, 'default.html');
            if (fs.existsSync(path_1)) {
                response.writeHead(200);
                fs.createReadStream(path_1).pipe(response);
            } else if (fs.existsSync(path_2)) {
                response.writeHead(200);
                fs.createReadStream(path_2).pipe(response);
            } else {
                console.log('400' + request.url);
                response.writeHead(404);
                response.end('404 Not Found');
            }
        } else {
            console.log('400' + request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');