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
  @Route(Authorization.Admin)
  async verify() {
    const { ctx, app } = this;
    const { name, pwd } = ctx.request.body;
    if (!name || !pwd) return [0, "用户名或密码不能为空"];
    const [code, data, msg] = await ctx.service.user.verifyUser(name, pwd);
    ctx.body = this.JsonBackResult(code, data, msg);
  }
  /**
   * @description 新增用户
   */
  async register() {
    const { ctx, app } = this;
    const { name, pwd } = ctx.request.body;
    if (!name || !pwd) return [0, "用户名或密码不能为空"];

    const [code, msg] = await ctx.service.user.createUser(name, pwd);

    ctx.body = this.JsonBackResult(code, null, msg);
  }
}

module.exports = UserController;
