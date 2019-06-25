// // 处理成功响应

module.exports = {
  success({ code = 0, data = null, message = '请求成功' } = {}, extend) {
    const { ctx } = this;

    ctx.body = {
      code,
      data,
      message,
      ...extend,
    };
    ctx.status = 200;
  },
};
