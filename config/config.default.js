/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_eggjs jwt';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  }
  config.sequelize = {
    dialect:'mysql',
    host:'127.0.0.1',
    port:3306,
    database:'world',
    username: 'root',
    password: '123456',
  }
  config.security = {
    csrf:{
      enable:false
    }
  }
  config.logger = {
    level: 'DEBUG',
    dir:'logs/output'
  }
  // config.customLogger = {
  //   scheduleLogger: {
  //      consoleLevel: 'NONE',
  //     //  file: 'aaa/bbb/egg-schedule.log',   // 新日志文件路径
  //    },
  // };
 
  // config.schedule = {
  //     directory: [],
  // };
  return {

    ...config,
    ...userConfig,
  };
};
