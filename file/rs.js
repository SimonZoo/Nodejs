'use strict';

var fs = require('fs');

var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:');
    console.log(chunk);
});
//data事件，数据可读取

rs.on('end', function () {
    console.log('END');
});
//end事件 流末尾

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});
//error 出错