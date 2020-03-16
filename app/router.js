'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/verify', controller.user.verify);
  router.get('/queryPagingList', controller.user.queryPagingList);
  router.post('/enDisabledUser', controller.user.enDisabledUser);
  router.resources('users','/users', controller.user)
};
