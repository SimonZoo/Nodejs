const Koa = require('koa');
//在koa中，导入的是class，大写Koa

const app = new Koa();
//创建一个Koa对象表示web app本身


app.use(async(ctx, next) => {
    console.log('function 1 - 1');
    await next();
    console.log('function 1 - 2');
});

app.use(async(ctx, next) => {
    console.log('function 2 - 1');
    await next();
    console.log('function 2 - 2');
});

app.use(async(ctx, next) => {
    console.log('function 3 - 1');
    await next();
    console.log('function 3 - 2');
});

app.listen(3002);