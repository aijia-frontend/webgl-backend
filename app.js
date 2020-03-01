'use strict';
require('./app/utils/key')
// 不走babel-loader,在启动文件中注册babel以支持es7的装饰器
const register = require('babel-register')
register({
  plugins: ['transform-decorators-legacy']
})

module.exports = app => {
  if (app.config.env === 'local') {
    app.beforeStart(async () =>
      await app.model.sync({
        // 如果为true,会先删掉表再创建表;
        force: false,
      }));
  }
};