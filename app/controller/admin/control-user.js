'use strict';

const Controller = require('egg').Controller;
const rule = require('./rule').user;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.userTransfer = {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
      jurisdiction: { type: 'number', required: true },
    };
    this.user2Transfer = {
      username: { type: 'string', required: true },
      jurisdiction: { type: 'number', required: true },
    };
    this.passwordTransfer = {
      oldpassword: { type: 'string', required: true },
      password: { type: 'string', required: true },
    };
  }
  // ============================================= 注册 =======================================================================
  async register() {
    const { ctx } = this;
    const body = ctx.request.body;
    body.jurisdiction = parseInt(body.jurisdiction);
    if (body.password !== body.chickpassword) {
      return ctx.throw('密码与再次输入的密码不一致', 200);
    }
    // ctx.validate(this.userTransfer, body);
    // body.password = await ctx.genHash(body.password);
    const data = await ctx.service.admin.serviceUser.register(body);
    ctx.helper.success({ data });
  }
  // ============================================= 登录 =======================================================================
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    if (!body.username || !body.password) {
      return ctx.throw('账号或密码为空', 200);
    }
    const data = await ctx.service.admin.serviceUser.login(body);
    ctx.helper.success({ data });
  }
  // ============================================= 更新 =======================================================================
  async update() {
    const { ctx } = this;
    const params = ctx.params;
    const body = ctx.request.body;

    if (!params.id) {
      return ctx.throw('该操作需要ID', 200);
    }
    body.jurisdiction = parseInt(body.jurisdiction);
    ctx.validate(this.user2Transfer, body);
    await ctx.service.admin.serviceUser.register(body, params);
    const data = await ctx.service.admin.serviceUser.getInfo(params);
    ctx.helper.success({ data });
  }
  // ============================================= 修改密码 =======================================================================
  async changePassword() {
    const { ctx } = this;
    const params = ctx.params;
    const body = ctx.request.body;
    if (!params.id) {
      return ctx.throw('该操作需要ID', 200);
    }
    ctx.validate(this.passwordTransfer, body);
    await ctx.service.admin.serviceUser.changePassword(body, params);
    // const data = await ctx.service.admin.serviceUser.getInfo(params);
    ctx.helper.success();
  }

}

module.exports = UserController;
 