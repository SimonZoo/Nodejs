'use strict';

var fs = require('fs');
var ws_1 = fs.createWriteStream('output.txt', 'utf-8');
ws_1.write('使用Stream写入文本数据……\n');
ws_1.write('END.');
ws_1.end();

var ws_2 = fs.createWriteStream('output.txt', 'utf-8');
ws_2.write(new Buffer('使用Stream写入二进制数据……\n', 'utf-8'));
ws_2.write(new Buffer('END.', 'utf-8'));
ws_2.end();

//所有可以读取数据的流都继承自stream.Readable
//所有可以写入的流都继承自stream.Writable