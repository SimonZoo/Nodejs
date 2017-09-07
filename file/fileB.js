'use strict';

var fs = require('fs');
fs.readFile('sample.jpg', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + 'bytes');
    }
});
// 二进制文件读取不传入文件编码
//回调函数的data参数将返回一个Buffer对象（包含零个或任意字节的数组）
