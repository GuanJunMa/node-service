
const Service = require('egg').Service;

class trademarkService extends Service {
  // ======================================================================  登录  ======================================================================
  async login(body) {
    const { ctx } = this;
    let user = await ctx.model.Admin.ModelUser.findOne({ username: body.username });
    if (!user) {
      ctx.throw('请输入正确的账号', 200);
    }
    const verifyPsw = await ctx.compare(body.password, user.password);
    if (!verifyPsw) {
      ctx.throw('账号或密码错误', 200);
    }
    user = JSON.parse(JSON.stringify(user));
    return {
      token: await ctx.service.common.sevActionToken.admin(user),
      user: {
        user_name: user.username,
        jurisdiction: user.jurisdiction,
        user_id: user._id,
      },
    };
  }
  // ======================================================================  注册/更新  ======================================================================
  async register(body, params) {
    const { ctx } = this;
    body.username = ctx.helper.shtml(body.username);
    // 判断账号是否已注册
    console.log('###########')
    console.log('###########', ctx.model)
    const chickuser = await ctx.model.Admin.ModelUser.findOne({ username: body.username, status: 1 });
    if (chickuser && chickuser.username !== body.username) {
      ctx.throw('当前账号已注册', 200);
    }

    // =================================== 修改 ===================================
    if (params) {
      // 非权限用户为8的删除参数jurisdiction
      if (!ctx.state.user.jurisdiction || ctx.state.user.jurisdiction < 8) {
        delete body.jurisdiction;
      }
      const _id = params.id;
      return await ctx.model.Admin.ModelUser.findOneAndUpdate({ _id }, body, { new: true });
    }
    // =================================== 创建 ===================================
    // 判断邀请码可靠性
    if (body.invitCode.length !== 12 && body.invitCode.length !== 24) {
      ctx.throw('当前邀请码无效', 200);
    }

    const invit_id = this.app.mongoose.Types.ObjectId(body.invitCode);
    const chickinvitCode = await ctx.model.Admin.ModelUser.findOne({ _id: invit_id });
    if (!chickinvitCode.username) {
      ctx.throw('当前邀请码无效', 200);
    }
    const user = await ctx.model.Admin.ModelUser.create(body);
    return {
      token: await ctx.service.common.sevActionToken.admin(user._id),
      user: {
        user_name: user.username,
        jurisdiction: user.jurisdiction,
        user_id: user._id,
      },
    };
  }
  // ======================================================================  修改密码  ======================================================================
  async changePassword(body, params) {
    const { ctx } = this;
    const _id = params.id;
    console.log(params);
    console.log(_id);
    const userData = await ctx.model.Admin.ModelUser.findOne({ _id, status: 1 });
    console.log(userData);

    if (!userData) {
      ctx.throw('账号信息错误', 200);
    }
    const verifyPsw = await ctx.compare(body.oldpassword, userData.password);
    if (!verifyPsw) {
      ctx.throw('原密码错误', 200);
    }
    if (body.password !== body.chickpassword) {
      ctx.throw('密码与再次输入的密码不一致', 200);
    }
    body.password = await ctx.genHash(body.password);

    return await ctx.model.Admin.ModelUser.findOneAndUpdate({ _id }, body, { new: true });

  }
}

module.exports = trademarkService;