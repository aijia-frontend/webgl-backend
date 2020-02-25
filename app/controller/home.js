'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.helper.test();
    // // ctx.cookies.set('userName','sss11212',{
    // //   httpOnly: false,
    // //   signed: false,
    // // })
    ctx.logger.info('debug info');
    // ctx.logger.info('some request data: %j', ctx.request.body);
    // ctx.logger.warn('WARNNING!!!!');
    
    // 错误日志记录，直接会将错误日志完整堆栈信息记录下来，并且输出到 errorLog 中
    // 为了保证异常可追踪，必须保证所有抛出的异常都是 Error 类型，因为只有 Error 类型才会带上堆栈信息，定位到问题。
    // ctx.logger.error(new Error('whoops'));
    ctx.body = 'hi, egg'
  }
}

module.exports = HomeController;
