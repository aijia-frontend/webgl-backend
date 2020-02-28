const Service = require('egg').Service;
const md5 = require('js-md5');
const JWT = require('jsonwebtoken');

class UserService extends Service {
  /**
   * @description 创建用户
   * @param { name:String } 用户名 
   * @param { pwd:String } 密码 
   */
  async createUser(name, pwd) {
    const {
      ctx
    } = this;
    const oldUser = await ctx.model.User.findOne({
      where: {
        user_name: name
      }
    });
    if (oldUser) return [0, '该用户已存在'];
    try {
      await ctx.model.User.create({
        user_name: name,
        // md5加密
        pwd: md5(pwd),
      })
      return [1, '创建成功']
    } catch {
      return [0, '创建失败']
    }
  }
  /**
   * @description 用户登陆验证
   * @param {*} name 
   * @param {*} pwd 
   */
  async verifyUser(name, pwd) {
    const { ctx } = this;
    const result = await ctx.model.User.findOne({
      where: {
        user_name: name,
        pwd: md5(pwd)
      }
    })

    if(result){
      const token = JWT.sign({
          userName:result.user_name
        },
        this.config.jwt.secret,
        {expiresIn:60*60*24}
      )
      return [1,token,'验证成功']
    }
    return [0,null,'验证失败']
  }
}

module.exports = UserService;