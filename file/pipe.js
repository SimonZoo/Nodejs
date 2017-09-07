'use strict';

var fs = require('fs');

var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);

//Readable流中的pipe()方法，所有数据从Readable流进入Writeable流
