'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      const { INTEGER, DATE, STRING } = Sequelize;
      return Promise.all([
        queryInterface.addColumn('users', 'email', {
          type: STRING(32),
          comment: '邮箱',
        }, { transaction: t }),
        queryInterface.addColumn('users', 'status', {
          type:INTEGER,
          comment: '账户状态',
          defaultValue: 0,
        }, { transaction: t }),
        queryInterface.addColumn('users', 'description', {
          type: STRING(256),
          comment: '描述',
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'email', { transaction: t }),
        queryInterface.removeColumn('users', 'status', { transaction: t }),
        queryInterface.removeColumn('users', 'description', { transaction: t })
      ]);
    });
  }
};
