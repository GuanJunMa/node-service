module.exports = app => {
  const { router, controller } = app;
  // router.post('/api/admin/user/login', controller.admin.ctrlUser.login);
  router.post('/api/admin/user/register', controller.admin.controlUser.register);
};

