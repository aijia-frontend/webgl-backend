/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_eggjs jwt";

  // add your middleware config here
  config.middleware = ["jwt"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.view = {
    mapping: {
      ".html": "ejs"
    }
  };
  config.security = {
    csrf: {
      enable: false
    }
  };
  config.logger = {
    level: "DEBUG",
    dir: "logs/output"
  };

  config.swaggerdoc = {
    dirScanner: "./app/controller",
    apiInfo: {
      title: "egg-example-api",
      description: "example for swaggerdoc",
      version: "1.0.0"
    },
    schemes: ["http"],
    enable: true,
    routerMap: false // 禁止自动注册路由, 否则会找不到注入对象
  };
  // config.jwt = {
  //   secret: "aijia123dr456beta789"
  // };
  // 配置session
  // config.session = {
  //   key: "SESSION_ID",
  //   maxAge: 24 * 3600 * 1000,
  //   httpOnly: true,
  //   encrypt: true,
  //   renew: true //滑动过期
  // };
  // 连接redis缓存服务器
  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "123456",
      db: 0
    }
  };
  // config.customLogger = {
  //   scheduleLogger: {
  //      consoleLevel: 'NONE',
  //     //  file: 'aaa/bbb/egg-schedule.log',   // 新日志文件路径
  //    },
  // };

  // config.schedule = {
  //     directory: [],
  // };
　config.security = {
　　csrf: {
　　　enable: false
　　},
　　  domainWhiteList: [ '*' ]
　　};
  // 跨域配置 
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  return {
    ...config,
    ...userConfig
  };
};