const Service = require('egg').Service;
const md5 = require('js-md5');
const JWT = require('jsonwebtoken');
const BaseService = require('./baseService');


class UserService extends BaseService {
  constructor(ctx){
    super('User', ctx)
    this.model = this.app.model.User;
    this.Op = this.app.Sequelize;
  }
  //#region 新增
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
  //#endregion 
  
  //#region  修改
  async updateStatus(id,status){
   return await this.update({id,status})
  }
  //#endregion

  //#region 查询
  /**
   * @description 查询所有用户
  */
  async queryUsers() {
    const { ctx, app } = this
    const { fn, col } = app.Sequelize;
    return await ctx.model.User.findAll({
      attributes: ['id', 'userName', 'mobile', 'email', 'status', 'description', 'createdAt', 'loginAt', 'count']
    })
  }

  /**
   * @description 分页查询
   * @param { pageNo:Number }  页码
   * @param { pageSize:Number } 一页多少条 
   */
  async queryPagingList(pageNo, pageSize) {
    const { ctx, app } = this
    const { fn, col } = app.Sequelize;
    const { count, rows } = await ctx.model.User.findAndCountAll({
      where: { state: 1 },
      attributes: ['id', 'userName', 'mobile', 'email', 'status', 'description', 'createdAt', 'loginAt', 'count'],
      offset: (pageNo - 1) * pageSize,
      limit: parseInt(pageSize)
    })
    return {
      pageSize: Number(pageSize),
      pageNo: Number(pageNo),
      totalCount: count,
      totalPage: Math.ceil(count / pageSize),
      data: rows,
    };
  }
  /**
   * @description 用户登陆验证
   * @param {*} name
   * @param {*} pwd
   */
  async verifyUser(account, password, loginType) {
    const { ctx, app } = this;
    let whereLamda = {
      password: md5(password)
    }
    switch (loginType) {
      // 邮箱登录
      case 0:
        Object.assign(whereLamda, { email: account })
        break;
      // 用户名登录
      case 1:
        Object.assign(whereLamda, { userName: account })
        break;
      // 手机号登录
      case 2:
        Object.assign(whereLamda, { mobile: account })
        break;
    }

    // row:true表示开启原生查询，原生查询支持的功能更多，自定义更强
    const user = await ctx.model.User.findOne({ where: whereLamda, attributes: ['id', 'mobile', 'status', 'count'], include: [{ model: ctx.model.Role, attributes: ['roleName'] }] });
    if (user) {
      const token = Math.uuid(32);
      const { id, mobile, status, Role:{ roleName } } = user;
      // 更新用户登录次数
      user.count += 1; 
      await user.save()
      // expiryMode:1、'EX' second 设置键的过期时间为 second 秒;2、'PX' millisecond 设置键的过期时间为 millisecond 毫秒;
      await app.redis.set(token, JSON.stringify({ mobile, status, roleName }), 'EX', 60 * 60 * 24);
      return user.status > 0 ? [1, { id, token, expire: + new Date(Number(new Date()) + 60 * 60 * 24 * 1000 ) }, '验证成功'] : [0, undefined, '该账户未激活,请联系管理员']
    }
    return [0, undefined, '账户或密码错误']
  }
  //#endregion
  async destroy(id){
    return await this.removeFake(id)
  }
}

module.exports = UserService;
