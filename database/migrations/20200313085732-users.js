'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      const { INTEGER, DATE } = Sequelize;
      return Promise.all([
        queryInterface.addColumn('users', 'count', {
          type:INTEGER,
          comment: '登录次数',
          defaultValue: 0,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'login_at', {
          type:DATE,
          comment: '最新登录时间',
          defaultValue: new Date(0),
        }, { transaction: t }),
      ]);
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'count', { transaction: t }),
        queryInterface.removeColumn('users', 'loginAt', { transaction: t }),
      ]);
    });
  }
};
