'use strict';
import Koa from 'koa';
import convert from 'koa-convert'; //koa1 转换器
import serve from 'koa-static';
import router from 'koa-simple-router';
import path from 'path';
import render from 'koa-swig';
import co from 'co';

/*自定义文件包*/
import config from './config/config';
import errorHandler from './Libs/errorHandler';
import controllers from './Controllers/controllerInit';


const app = new Koa();

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: config.swigCache,
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));

errorHandler.error(app); //处理页面错误的处理句柄

controllers.getAllrouters(app, router); //初始化controllers

app.use(serve(config.staticDir)); // 静态资源文件

//监听端口🐂😊
app.listen(config.port);
console.log('ydVueSystem listening on port %s', config.port);
module.exports = app;