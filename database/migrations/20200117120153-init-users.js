'use strict';

module.exports = {
  up:async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users',{
      // 主键
      id:{ type:INTEGER, primaryKey:true, autoIncrement:true },
      // 用户名
      name:STRING(30),
      // 年龄
      age:INTEGER,
      // 创建时间
      created_at:DATE,
      // 更新时间
      updated_at:DATE
    })
  },

  down: async(queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   await queryInterface.dropTable('users');
  }
};
