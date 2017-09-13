const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var 
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch : watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });

    //如果在options(opts)中存在自定义的filters，为env加入这个自定义的过滤器
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views',{
    watch: true,

    //在options中自定义过滤器
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html', { name: 'Simon', 
fruits: ['Apple', 'Pear', 'Banana'],
count: 12000 })
console.log(s);

console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla bla...'
}));

