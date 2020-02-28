const JWT = require('jsonwebtoken');

module.exports = options => {
  return async function (ctx, next) {
    const token = ctx.request.header.authorization;
    // const method = ctx.method.toLowerCase();
    console.log(token);
    if (!token) {
      if (ctx.path === '/register' || ctx.path === '/verify') {
        await next();
      } else {
        ctx.throw(401, '未登录， 请先登录');
      }
    } else {
      try {
        let decode = JWT.verify(token, options.secret);
        console.log(decode)
        if (!decode || !decode.userName) {
          ctx.throw(401, '没有权限，请登录');
        }
        if (Date.now() - decode.expire > 0) {
          ctx.throw(401, 'Token已过期');
        }
        const user = await ctx.model.User.findOne({
          where: {
            user_name: decode.userName,
          }
        })
        if (user) {
          await next();
        } else {
          ctx.throw('401', '用户信息验证失败');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
};