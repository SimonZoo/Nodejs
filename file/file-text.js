'use strict';

var fs = require('fs');

fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        console.log('isFile: ' + stat.isFile());
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            console.log('size: ' + stat.size);
            console.log('birth time: ' + stat.birthtime);
            console.log('modified time:' + stat.mtime);
        }
    }
});
//获取文件信息



fs.readFile('sample.txt', 'utf-8', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        var text = data.toString('utf-8');
        //Buffer对象和String做转换
        //var buf = Buffer.from(text, 'utf-8');
        console.log(text);
    }
});
//异步读取文本文件操作
//sample.txt 文件必须在当前目录下，且文件编码为utf-8
//正常读取时，err参数为null，data为读取到的string
//读取错误时，err代表一个错误对象，data为undefined



var dataToWrite = 'New Data for Test.';
fs.writeFile('sample.txt', dataToWrite, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('OK');
    }
});
//写入文件操作


//会清空文件再写入，若不清空，则：
fs.appendFile('sample.txt', ' Hello Node.' ,'utf-8',function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('OK~');
    }
});


//同步读取
// var fs = require('fs');
// var data = fs.readFileSync('sample.txt', 'utf-8');
// console.log(data);