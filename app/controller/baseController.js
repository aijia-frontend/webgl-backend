const Controller = require('egg').Controller;
const _state = [ ['[object Number]'], [ '[object Object]', '[object Array]', '[object String]' ], ['[object String]'] ];
class BaseController extends Controller {

  JsonBackResult(...args) {
    let result = { code: 0, data: {}, msg: '' },
      keys = Object.keys(result),
      i = -1;
    while (++i < keys.length) {
      let state = false,
        j = -1,
        length = Object.prototype.toString.call(_state[i]) === '[object Array]' ? _state[i].length : 0;
      while (++j < length) {
        state = state || Object.prototype.toString.call(args[i]) === _state[i][j];
      }
      if (state) {
        result[keys[i]] = args[i];
      }
    }
    return result;
  }
}
BaseController.Auth = {
  SuperAdmin: 'SuperAdmin',
  Admin: 'Admin',
  General: 'General'
}
module.exports = BaseController;
