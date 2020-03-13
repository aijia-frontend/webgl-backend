const Service = require('egg').Service;
const md5 = require('js-md5');
const JWT = require('jsonwebtoken');


class UserService extends Service {
  /**
   * @description 创建用户
   * @param { name:String } 用户名
   * @param { pwd:String } 密码
   */
  async createUser(mobile, password) {
    const { ctx } = this;
    const oldUser = await ctx.model.User.findOne({
      where: {
        mobile,
      },
    });
    if (oldUser) return [ 0, '该用户已存在' ];
    try {
      await ctx.model.User.create({
        userName: mobile,
        mobile,
        // md5加密
        password: md5(password),
      });
      return [ 1, '创建成功' ];
    } catch (e) {
      console.error(e);
      return [ 0, '创建失败' ];
    }
  }
  /**
   * @description 用户登陆验证
   * @param {*} name
   * @param {*} pwd
   */
  async verifyUser(account, password,loginType) {
    const { ctx, app } = this;
    let whereLamda = {
      password: md5(password)
    }
    switch(loginType){
      // 邮箱登录
      case 0:
        Object.assign(whereLamda, { email:account })
        break;
      // 用户名登录
      case 1:
        Object.assign(whereLamda, { userName:account })
        break;
      // 手机号登录
      case 2:
        Object.assign(whereLamda, { mobile:account })
        break;
    }
    // row:true表示开启原生查询，原生查询支持的功能更多，自定义更强
    const user = await ctx.model.User.findOne({ where: whereLamda, attributes: [ 'mobile','status' ], raw: true, include: [{ model: ctx.model.Role, attributes: [ 'roleName' ] }] });
    if (user) {
      const token = Math.uuid(32);
      const { mobile, status, 'Role.roleName': roleName } = user;
      // expiryMode:1、'EX' second 设置键的过期时间为 second 秒;2、'PX' millisecond 设置键的过期时间为 millisecond 毫秒;
      const sss = await app.redis.set(token, JSON.stringify({ mobile, status, roleName }), 'EX', 60 * 60 * 24);
      console.log('asdfasdfasdf==========================',sss)
      return user.status > 0 ? [ 1, token, '验证成功' ] : [ 0, undefined, '该账户未激活,请联系管理员' ]
    }
    return [ 0, undefined, '账户或密码错误' ]
  }
  /**
   * @description 查询所有用户
  */
  async queryUsers(){
    const { ctx, app } = this
    const { fn, col } = app.Sequelize;
    return await ctx.model.User.findAll({
      attributes: ['id','userName','mobile','email','status','description','createdAt','loginAt','count']
    })
  }
}

module.exports = UserService;
