var http = require('http');

var fs = require('fs');

var path = require('path');

var mime = require('mime');

var cache = {}; // cache是用来缓存文件内容的对象

//下面三个函数用来提供静态HTTP文件服务
//请求文件不存在时返回404
function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: A-oh,resource not found.');
    response.end();
}
//若存在发送文件内容，文件属性由mime判断返回
function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
    response.end(fileContents);
} 

function serverStatic(response, cache, absPath) {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function (exists) {
            if (exists) {
                fs.readFile(absPath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                });
            } else {
                send404(response);
            }
        });
    }
}

var server = http.createServer(function (request, response) {
    var filePath = false;
    if (request.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url;
    }
    var absPath = './' + filePath;
    serverStatic(response, cache, absPath);
});



server.listen(3000, function () {
    console.log('Server listening on port 3000...');
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server, function() {
    console.log('chatServer start..')
}); // Socker.io与HTTP服务器共享同一个TCP/IP端口