const Koa = require('koa');
const Static = require('koa-static');
const path = require('path');

const app = new Koa();
const staticPath = '/public/index.html';

app.use(Static(path.resolve(__dirname, staticPath)));

// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

app.listen(6060);
