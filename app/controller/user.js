"use strict";
// app/controller/users.js
const Controller = require("egg").Controller;
const BaseController = require("./baseController");
const { Route } = require("../decorators/index");
const { Sequelize } = require("Sequelize");
const { gt, lte, ne, in: opIn, like } = Sequelize.Op;
const { Authorization } = require('./../utils/authorization')
class UserController extends BaseController {
  /**
   * @description 用户校验
   */
  async verify() {
    const { ctx, app } = this;
    const { mobile, password } = ctx.request.body;
    if (!mobile || !password) return [0, "用户名或密码不能为空"];
    const [code, data, msg] = await ctx.service.user.verifyUser(mobile, password);
    ctx.body = this.JsonBackResult(code, data, msg);
  }
  /**
   * @description 新增用户
   */
  async register() {

    const { ctx, app } = this;
    const { mobile, password,captcha } = ctx.request.body;
 
    if (!mobile || !password || !captcha){
      ctx.body = this.JsonBackResult(0, {},"用户名、密码、验证码不能为空");
      return;
    }
    if(!/^1[3456789]\d{9}$/.test(mobile)){
      ctx.body = this.JsonBackResult(0, {},"手机号码格式不正确");
      return;
    }
    let level = 0
    // 判断这个字符串中有没有数字
    if (/[0-9]/.test(password)) {
      level++
    }
    // 判断字符串中有没有字母
    if (/[a-zA-Z]/.test(password)) {
      level++
    }
    // 判断字符串中有没有特殊符号
    if (/[^0-9a-zA-Z_]/.test(password)) {
      level++
    }
    // 密码必须保证含数字、字母、特殊字符
    if (level < 3) {
      ctx.body = this.JsonBackResult(0, {},"密码强度不够");
      return;
    }
    const [code, msg] = await ctx.service.user.createUser(mobile, password);
  
    ctx.body = this.JsonBackResult(code, {}, msg);
  }
}

module.exports = UserController;
