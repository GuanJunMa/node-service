module.exports = app => {
  const mongoose = app.mongoose;
  const trademarkSchema = new mongoose.Schema({
    username: { type: String, required: true }, // 用户名称
    password: { type: String, required: true }, // 用户密码
    invitCode: { type: String, required: true }, // 邀请码
    nickname: { type: String }, // 昵称
    introduction: { type: String }, // 简介
    phoneNumber: { type: Number }, // 手机号
    address: { type: String }, // 地址
    jurisdiction: { type: Number, required: true, default: 0 }, // 权限9-最高，0-观察者，1-管理者
    updata_date: { type: Date, default: Date.now }, // 更新时间
    created_date: { type: Date, default: Date.now }, // 创建时间
    status: { type: Number, default: 1 }, // 0已删除，1是正常
  }, {
    versionKey: false,
    timestamps: { createdAt: 'created_date', updatedAt: 'updata_date' },
  });
  return mongoose.model('user', trademarkSchema);
};

