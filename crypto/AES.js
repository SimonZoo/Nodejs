//AES自行封装函数以便使用
//AES除了指定密钥还能制定IV，不同系统只要IV不同，
//相同密钥加密的到的加密结果也是不一样的
const crypto = require('crypto');

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

var data = 'Hello, this is a secret message.';
var key = 'password';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text:' + data);
console.log('Encrypted text:' + encrypted);
console.log('Decrypted text:' + decrypted);