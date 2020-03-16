'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/register', controller.user.register);
  router.post('/verify', controller.user.verify);
  router.get('/queryPagingList', controller.user.queryPagingList);
  
  router.resources('users','/users', controller.user)
};
