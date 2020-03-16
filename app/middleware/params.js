/**
 * 获取请求参数中间件
 * 可以使用ctx.params获取get、post、delete等请求参数
 */

module.exports = options => {
  return async function params(ctx, next) {
    ctx.params = ctx.params || {}
    Object.assign(ctx.params,ctx.query,ctx.request.body)
    await next();
  };
}