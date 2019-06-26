'use strict';

module.exports = app => {
  app.router.post('/api/admin/user/register', app.controller.admin.controlUser.register);
};
