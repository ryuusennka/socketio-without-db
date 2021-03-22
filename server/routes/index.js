/*
 * @Author: ryuusennka
 * @Date: 2021-03-19 15:24:40
 * @LastEditors: ryuusennka
 * @LastEditTime: 2021-03-22 18:08:05
 * @FilePath: /quick-test/server/routes/index.js
 * @Description:
 */

const Router = require('express').Router();

module.exports = function (app) {
  app.get('/', (req, res) => {
    res.render('home');
  });
  app.get('/chat', (req, res) => {
    res.render('chat');
  });
};
