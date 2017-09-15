const http = require('http');

var server = http.createServer();

var handleRequest = function(request, response) {
    console.log('Request url:' + request.url);
    response.write('Hello，');
    response.write('Simon');
    response.end();
}


server.on('request', handleRequest);

server.listen(3003, function() {
    console.log('Server is running at port 3003.');
});

//过程 
// 1.发送请求 
//2.处理请求 
//3.发送响应