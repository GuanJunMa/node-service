'use strict';

const Service = require('egg').Service;


class ActionTokenService extends Service {
  // 签发h5页面token
  async apply({ jurisdiction, username }) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: { jurisdiction, username },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.web);
  }

  // 签发后端管理员token
  async admin({ jurisdiction, username }) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: { jurisdiction, username },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.admin);
  }
}

module.exports = ActionTokenService;
