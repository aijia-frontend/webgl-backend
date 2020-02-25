const Controller = require('egg').Controller;

class DemoController extends Controller {
  async index() {
    const { ctx, app } = this;
    const userName = ctx.cookies.get('userName');
    console.log(userName);
    await ctx.render('news',{
      userName
    })
  }
}

module.exports = DemoController;