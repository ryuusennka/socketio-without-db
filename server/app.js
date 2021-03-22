/*
 * @Author: ryuusennka
 * @Date: 2021-02-28 23:20:35
 * @LastEditors: ryuusennka
 * @LastEditTime: 2021-03-19 17:21:12
 * @FilePath: /quick-test/server/app.js
 * @Description:
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').createServer(app);
const socketio = require('./socket');
const routes = require('./routes');
const { resolve } = require('./utils');
require('dotenv').config();

app.use(express.json()); // 接收body
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(express.static(resolve('src/public')));
app.set('views', resolve('src/views')); // 定义模板文件所在的目录
app.set('view engine', 'ejs'); // 定义一个模板引擎

socketio(server);
routes(app);
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
