/*
 * @Author: ryuusennka
 * @Date: 2021-02-28 23:44:54
 * @LastEditors: ryuusennka
 * @LastEditTime: 2021-03-19 15:34:30
 * @FilePath: /quick-test/server/utils/index.js
 * @Description:
 */
const path = require('path');
export const handlePromiser = promise =>
  promise.then(res => [null, res]).catch(err => [err, null]);

export const resolve = dir => {
  return path.join(__dirname, '..', dir); // 针对server文件夹
};

// [响应用户]返回错误信息
export const errors = msg => ({ errors: msg });
