const Controller = require('egg').Controller;
class BaseController extends Controller {
  JsonBackResult(...args) {
    console.log(!!args[0], !!args[1])
    let result = {};
    !!args[0] && (Object.assign(result, {
        code: args[0]
      }))
      !!args[1] && Object.assign(result, {
        data: args[1]
      })
      !!args[2] && Object.assign(result, {
        msg: args[2]
      })
    return result;
  }
}
module.exports = BaseController;