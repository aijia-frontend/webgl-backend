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
  config.middleware = [
    'jwt'
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  config.sequelize = {
    dialect:'mysql',
    host:'106.15.203.69',
    port:3306,
    database:'webgl',
    username: 'root',
    password: 'Jrh20060607+',
  }
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.logger = {
    level: 'DEBUG',
    dir: 'logs/output',
  };
  config.jwt= {
    secret:'aijia123dr456beta789'
  }
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-example-api',
      description: 'example for swaggerdoc',
      version: '1.0.0',
    },
    schemes: ['http'],
    enable: true,
    routerMap: false, // 禁止自动注册路由, 否则会找不到注入对象
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
