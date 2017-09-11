const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const router = require('koa-router')();//函数

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

router.get('/', async (ctx, next) => {
    console.log('router.get()');
    ctx.response.body = `<h1>Index<\h1>
        <form action="/signin" method="post">
            <p>Name : <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var 
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name} , password : ${password}`);
    if (name === 'koa' && password ==='12345') {
        ctx.response.body = `<h1>Welcome, ${name}</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed</h1>
        <p><a href="/"> Try Again</p>`;

    }
});

app.use(bodyParser());

app.use(router.routes());

app.listen(3002);

console.log('app is running at port 3002...');