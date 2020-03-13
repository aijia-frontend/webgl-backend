const {
  Authorization,
} = require('./../utils/authorization');
/**
 * @description 用户接口访问权限判断
 * @param { roleName:String } 访问该接口所需的角色名称
 */
exports.Route = roleType => {
  return function(target, name, descriptor) {
    const old = descriptor.value;
    // AOP劫持会话
    descriptor.value = async function(options) {
      // 注意这里需要保留原this作用域，不能使用箭头函数
      const { ctx, app } = this;
      const token = ctx.request.header.authorization;
      const userJson = await app.redis.get(token);
      const user = JSON.parse(userJson);
      if (user && user.roleName == Authorization[roleType]) {
        return old.apply(this, options);
      }
      ctx.status = 403
      ctx.body = {
        code: 403,
        data: null,
        msg: '该账户无此接口的访问权限',
      };
    };
  };
};
