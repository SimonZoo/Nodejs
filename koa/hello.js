const Koa = require('koa');
//在koa中，导入的是class，大写Koa

const app = new Koa();
//创建一个Koa对象表示web app本身


app.use(async(ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2.</h1>';
});
//对于任何请求，app将调用该异步函数处理请求
//ctx是由koa传入的封装了request和respons的变量
//next是koa传入的将要处理的下一个异步函数


app.listen(3001);
console.log('app started at port 3001..');