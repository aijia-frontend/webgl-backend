'use strict';
module.exports = app => {
  const {
    STRING,
    CHAR,
    DATE,
    BOOLEAN,
    INTEGER,
  } = app.Sequelize;
  const User = app.model.define('user', {
    // 主键
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
    },
    // 用户名
    user_name: {
      type: STRING(30),
      comment: '用户名',
    },
    // 密码
    pwd: CHAR(32),
    // 状态
    state: {
      type:BOOLEAN,
      defaultValue:1,
    },
    // 创建时间
    created_at: DATE,
    // 更新时间
    updated_at: DATE,
  });
  User.associate = function() {
    app.model.User.belongsTo(app.model.Role);
  };
  return User;
};
