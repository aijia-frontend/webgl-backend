'use strict';
module.exports = app => {
  const { STRING, CHAR, DATE, BOOLEAN, INTEGER } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
      UNIQUE: true, // UNIQUE约束，在数据库层面保证一致性
    },
    userName: {
      type: STRING(30),
      comment: '用户名',
      allowNull: false, // 不允许为空
    },
    mobile: {
      type: STRING(11),
      comment: '手机号',
    },
    email: {
      type: STRING(32),
      comment: '邮箱',
    },
    password:{
      type: CHAR(32),
      comment: '密码',
    },
    // -1:禁用,0:锁定,1:启用
    status:{
      type:INTEGER,
      comment: '账户状态',
      defaultValue: 0,
    },
    state: {
      type: BOOLEAN,
      defaultValue: 1,
    },
    description:{
      type: STRING(256),
      comment: '描述',
    },
    count:{
      type:INTEGER,
      comment: '登录次数',
      defaultValue: 0,
    },
    loginAt:{
      type:DATE,
      comment: '最新登录时间',
      defaultValue: new Date(0),// 默认1970-01-01 00:00:00
    },
  }, {
    freezeTableName: true, // 默认false修改表名为复数，true不修改表名，与数据库表名同步
    timestamps: true, // 是否自动添加时间戳createAt，updateAt,如果为false,数据库不生成create_at和update_at
    tableName: 'users',
    underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）,
    // // 中间表的model
    // through: app.model.groupUser,
    // // 进行关联查询时，关联表查出来的数据模型的alias
    // as: 'project',
    // // 是否采用外键进行物理关联
    // constraints: false,
    // //'deleted_at'
    // deletedAt: false, 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
    // 删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
    // paranoid: false,
    // 不需要createdAt字段
    // createdAt: false,
    // 将updatedAt字段改个名
    // updatedAt: 'utime'
  });
  User.associate = function() {
    app.model.User.belongsTo(app.model.Role);
  };
  return User;
};
