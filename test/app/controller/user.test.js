const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/controller/user.test.js', () => {
  describe('should code 1', () => {
    it('should code 1', async () => {
     const res = await app.httpRequest().post('/verify').type('form')
        .send({ mobile: '17768123542', password: '123456zz' })
        .expect(200);
      console.log(res.body)
      assert(res.body.code === 1)
      assert(res.body.msg === '验证成功')
    });
  });
});
