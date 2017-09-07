'use strict';

process.nextTick(function() {
    console.log('nextTick callback!'); //在下一次事件执行时才会调用nextTick函数
});

console.log('text nextTick');