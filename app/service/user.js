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
        mobile: mobile
      }
    });
    console.log('oldUser',oldUser)
    if (oldUser) return [0, '该用户已存在'];
    try {
      await ctx.model.User.create({
        userName: mobile,
        mobile:mobile,
        // md5加密
        password: md5(password),
      })
      return [1, '创建成功']
    } catch(e){
      console.error(e)
      return [0, '创建失败']
    }
  }
  /**
   * @description 用户登陆验证
   * @param {*} name 
   * @param {*} pwd 
   */
  async verifyUser(mobile, password) {
    const { ctx,app } = this;

    // row:true表示开启原生查询，原生查询支持的功能更多，自定义更强
    let user = await ctx.model.User.findOne({where:{mobile:mobile,password:md5(password)},attributes:['userName'], raw: true,include:[{model:ctx.model.Role,attributes:['roleName']}]})
    if(user){
      const token = Math.uuid(32);
      const { mobile,'Role.roleName':roleName } = user;
      await app.redis.set(token,JSON.stringify({userName:mobile,roleName:roleName}),'EX',60*60*24)
      return [1,token,'验证成功']
    }
    return [0,null,'验证失败']
  }
}

module.exports = UserService;