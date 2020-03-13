'use strict';
require('./app/utils/key');
// 支持装饰器。因为不走babel-loader,在启动文件中注册babel以支持es7的装饰器
const register = require('babel-register');
register({
  plugins: [ 'transform-decorators-legacy' ],
});


class AppBootHook {
  constructor(app) {
    this.app = app;
  }
  /**
   * @description 所有的插件都已启动完毕，但是应用整体还未 ready
   *              可以做一些数据初始化等操作，这些操作成功才会启动应用
   */
  async willReady() {
    // 请将你的应用项目中 app.beforeStart 中的代码置于此处。
    if (this.app.config.env === 'local') {
      await this.app.model.sync({
        // 如果为true,会先删掉表再创建表;
        force: false,
      });
    }
  }
}
module.exports = AppBootHook;
