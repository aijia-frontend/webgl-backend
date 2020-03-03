const Controller = require('egg').Controller;
class BaseController extends Controller {
  JsonBackResult(...args) {
    let result = {};
    args[0] != null && (Object.assign(result, {
        code: args[0]
      }))
    args[1] != null && Object.assign(result, {
        data: args[1]
      })
    args[2] != null && Object.assign(result, {
        msg: args[2]
      })
    return result;
  }
}
module.exports = BaseController;