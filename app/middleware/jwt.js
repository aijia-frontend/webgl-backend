const JWT = require('jsonwebtoken');

module.exports = (options,app) => {
  return async function (ctx, next) {
    const token = ctx.request.header.authorization;
    if (ctx.path === '/register' || ctx.path === '/verify') {
      await next();
    } else {
      if (!token) {
        ctx.throw(401, '未登录， 请先登录');
      } else {
        try {
          const user = JSON.parse(await app.redis.get(token));
          if (user && user.userName) {
            await next();
          }else{
            ctx.throw(401, '没有权限，请登录');
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
};