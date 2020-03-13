module.exports = {
  foo(param) {
    // 这里的this指向app
    console.log(this, param);
  },
};
