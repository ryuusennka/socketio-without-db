/*
 * @Author: ryuusennka
 * @Date: 2021-02-28 23:44:54
 * @LastEditors   : ryuusennka
 * @LastEditTime  : 2021-11-01 03:10:31
 * @FilePath      : /socketio-without-db/server/utils/index.js
 * @Description:
 */
const path = require('path');
const handlePromiser = promise =>
  promise.then(res => [null, res]).catch(err => [err, null]);

const resolve = dir => {
  return path.join(__dirname, '..', dir); // 针对server文件夹
};

// [响应用户]返回错误信息
const errors = msg => ({ errors: msg });

module.exports = {
  handlePromiser,
  resolve,
  errors,
};
