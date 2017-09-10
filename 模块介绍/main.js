'use strict';

var greet = require('./Hello');//相对目录，通过require引用模块的变量

var s = 'Simon';
greet(s);