const Koa = require('koa');

const router = require('koa-router')();//返回函数

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}<\h1>`;
});
//注册一个GET请求，可以在请求路径中使用带变量的的/hello/:name
//变量可以通过 ctx.params.name 来访问

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index<\h1>`;
});

app.use(router.routes());

app.listen(3001);
console.log('app started at port 3001...');