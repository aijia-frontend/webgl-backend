const JWT = require('jsonwebtoken');

module.exports = (options, app) => {
  return async function(ctx, next) {
    const token = ctx.request.header['access-token'];
    if (ctx.path === '/register' || ctx.path === '/verify') {
      await next({ name: 'sa' });
    } else {
      if (!token) {
        ctx.status = 401;
        ctx.body = '未登录， 请先登录';
      } else {
        try {
          const user = JSON.parse(await app.redis.get(token));
          // 判断用户登录信息是否失效
          if ( user && user.mobile ) {
            await next()
          } else {
            ctx.status = 403;
            ctx.body = '登录已过期，请重新登录';
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
};
