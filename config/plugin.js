'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 数据库
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  // 工具，生成token等
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  // 工具，加密数据
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },

  // 工具，校验 格式化 请求体
  validate: {
    enable: true,
    package: 'egg-validation',
  }
};