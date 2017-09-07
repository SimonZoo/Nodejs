'use strict';

process.on('exit', function(code) {
    console.log('when the function is going to exit : ' + code);
});

var s = 'Simon';
console.log('1 st ');

if (typeof(window) === 'undefined') {
    console.log('Nodejs');
}else {
    console.log('Browser');
}