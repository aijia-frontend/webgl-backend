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
    const { ctx } = this;
    const oldUser = await ctx.model.User.findOne({
      where: {
        userName: name
      }
    });
    console.log('oldUser',oldUser)
    if (oldUser) return [0, '该用户已存在'];
    try {
      await ctx.model.User.create({
        userName: name,
        // md5加密
        pwd: md5(pwd),
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
  async verifyUser(name, pwd) {
    const { ctx,app } = this;
    // row:true表示开启原生查询，原生查询支持的功能更多，自定义更强
    let user = await ctx.model.User.findOne({attributes:['userName'], raw: true,include:[{model:ctx.model.Role,attributes:['roleName']}]})
    if(user){
      const token = Math.uuid(32);
      const { userName,'Role.roleName':roleName } = user;
      await app.redis.set(token,JSON.stringify({userName:userName,roleName:roleName}),'EX',60*60*24)
      return [1,token,'验证成功']
    }
    return [0,null,'验证失败']
  }
}

module.exports = UserService;