'use strict';
module.exports = app => {
  const {
    STRING,
    DATE,
    BOOLEAN,
    INTEGER,
  } = app.Sequelize;
  const Role = app.model.define('Role', {
    // 主键
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
      UNIQUE:true // UNIQUE约束，在数据库层面保证一致性
    },
    // 角色名
    roleName: {
      type: STRING(30),
      comment: '用户名',
    },
    // 状态
    state: BOOLEAN,
    // 创建时间
    created_at: DATE,
    // 更新时间
    updated_at: DATE,
  });
  Role.associate = function() {
    app.model.Role.hasMany(app.model.User, {
      as: 'users',
    });
  };
  return Role;
};
