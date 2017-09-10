const crypto = require('crypto');

const hash = crypto.createHash('md5');
//也可计算‘sha1’
hash.update('Hello, world.');
hash.update('Hello, Nodejs.');
//可任意多次调用update()，该方法默认UTF-8，也可以传入Buffer

console.log(hash.digest('hex'));
//选择编码方式：'hex', 'binary' 或者'base64'