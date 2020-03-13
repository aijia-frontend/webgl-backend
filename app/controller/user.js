'use strict';
// app/controller/users.js
const BaseController = require('./baseController');
const { Route } = require('../decorators/index');
const { Sequelize } = require('Sequelize');
const { gt, lte, ne, in: opIn, like } = Sequelize.Op;
class UserController extends BaseController {
  /**
   * @description 用户校验
   */
  async verify() {
    const { ctx, app, service } = this;
    // try {
    //   ctx.validate({
    //     mobile: /^1[3456789]\d{9}$/,
    //     password: 'password',
    //   });
    // } catch (err) {
    //   console.log(err);
    //   const msg = err.errors.reduce((sum, cur, index) => {
    //     return sum += `${index ? ';' : ''} ${index + 1}:${cur.field} ${cur.message}`;
    //   }, '');
    //   ctx.body = this.JsonBackResult(0, {}, msg);
    //   return;
    // }
    let [ code, data, msg ] = [ 0, {}, '' ] ;
    if('loginType' in ctx.request.body){  // 账号密码登录
      const { account, password, loginType } = ctx.request.body;
      [ code, data, msg ] = await service.user.verifyUser(account, password,loginType);
    }else{ // 验证码登录
      const { mobile, captcha } = ctx.request.body;
    }
    ctx.body = this.JsonBackResult( code, data, msg ) 
  }
  /**
   * @description 查询所有用户
   */
  async index(){
    const { service, ctx } = this;
    const users = await service.user.queryUsers();
    console.log(users)
    ctx.body = users ? this.JsonBackResult(1, users, '查询成功') : this.JsonBackResult(0, undefined, '查询失败')
  }
  /**
   * @description 新增用户
   */
  async register() {
    const { ctx, app } = this;
    const { mobile, password, captcha } = ctx.request.body;
    ctx.validate({
      mobile: /^1[3456789]\d{9}$/,
      password: 'password',
      captcha: 'string',
    });
    if (!mobile || !password || !captcha) {
      ctx.body = this.JsonBackResult(0, {}, '用户名、密码、验证码不能为空');
      return;
    }
    if (!/^1[3456789]\d{9}$/.test(mobile)) {
      ctx.body = this.JsonBackResult(0, {}, '手机号码格式不正确');
      return;
    }
    let level = 0;
    // 判断这个字符串中有没有数字
    if (/[0-9]/.test(password)) {
      level++;
    }
    // 判断字符串中有没有字母
    if (/[a-zA-Z]/.test(password)) {
      level++;
    }
    // 判断字符串中有没有特殊符号
    if (/[^0-9a-zA-Z_]/.test(password)) {
      level++;
    }
    // 密码必须保证含数字、字母、特殊字符
    if (level < 3) {
      ctx.body = this.JsonBackResult(0, {}, '密码强度不够');
      return;
    }
    const [ code, msg ] = await ctx.service.user.createUser(mobile, password);

    ctx.body = this.JsonBackResult(code, {}, msg);
  }
}

module.exports = UserController;
