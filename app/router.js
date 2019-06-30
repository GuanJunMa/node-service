'use strict';

module.exports = app => {
  app.router.post('/api/admin/user/register', app.controller.admin.controlUser.register);
  app.router.post('/api/admin/user/login', app.controller.admin.controlUser.login);
};
