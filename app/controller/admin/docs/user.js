// ====================================================================================================================

/**
  * @api {post} /api/admin/user/register 1-注册
  * @apiVersion 0.0.1
  * @apiGroup User
  * @apiSampleRequest /api/admin/user/register
  * @apiParamExample {json} 参数:
  {
      "username": "new",
      "password": "abc123",
      "jurisdiction": 0
  }
  * @apiContentType application/json
  * @apiSuccess {Number} code
  * @apiSuccess {Object[]} data
  * @apiSuccess {String} message
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 OK
  {
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiZXhwIjoxNTM1ODA5ODg1LCJpYXQiOjE1MzUyMDUwODV9.xS0p9v_eQSAz_12NVEC3TWNRlHA0zvNyf2RRpWM9dD8",
        "user": {
            "user_name": "new",
            "jurisdiction": 0
        }
    },
    "message": "请求成功"
  }
  */
// ====================================================================================================================

/**
  * @api {post} /api/admin/user/login 2-登录
  * @apiVersion 0.0.1
  * @apiGroup User
  * @apiParamExample {json} 参数:
  {
    "username": "watch",
    "password": "abc123"
  }
  * @apiContentType application/json
  * @apiSampleRequest /api/admin/user/login
  * @apiSuccess {Number} code
  * @apiSuccess {Object[]} data
  * @apiSuccess {String} message
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 OK
  {
    "code": 0,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Imp1cmlzZGljdGlvbiI6OSwidXNlcm5hbWUiOiJyb290In0sImV4cCI6MTU0MzI5MDY2NCwiaWF0IjoxNTQyNjg1ODY0fQ.VeJgsEJPjZIMsqe0BFxgPv_u8vFr7LurQBBss3RQooY",
        "user": {
            "user_name": "watch",
            "jurisdiction": 0
        }
    },
    "message": "请求成功"
  }
  */

