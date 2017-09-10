const crypto = require('crypto');
//Hmac算法，传入密钥
//密钥发生变化时，输入同样的数据也会得到不同的签名
const hmac = crypto.createHmac('sha256', 'sercet-key');

hmac.update('Hello, world.');
hmac.update('Hello, Nodejs.');

console.log(hmac.digest('hex'));

