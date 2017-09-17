const Koa = require('koa');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');

const app = new Koa();

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} : ${ctx.request.url}`);
    await next();
});

app.use(bodyparser());
app.use(router.routes());

router.get('/:name', async(ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello!! I know you are ${name}</h1> \n
        <form action="/signin" method="post">
        <p>Name: <input name="name" value=${name}></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (password === `${name}`) {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

router.get('/', async(ctx, next) => {
    ctx.response.body = `Hello..`;
});


app.listen(3003);
console.log('Running at port 3003');

