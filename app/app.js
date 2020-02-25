module.exports = app => {
  app.logger.debug('debug info');
  app.logger.info('启动耗时 %d ms', Date.now() - start);
  app.logger.warn('warning!');

  app.logger.error(someErrorObj);
};