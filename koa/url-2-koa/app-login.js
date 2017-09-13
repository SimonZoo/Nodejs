const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

// const router = require('koa-router')();//函数

const app = new Koa();

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());

// app.use(router.routes());

app.use(controller());

app.listen(3002);
console.log('running in 3002.');