module.exports = app => {
  const { STRING,DATE,BOOLEAN,INTEGER } = app.Sequelize
  const File = app.model.define('file',{
    id:{
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键',
      UNIQUE: true, // UNIQUE约束，在数据库层面保证一致性
    },
    // 原文件名
    fileName:{
      type: STRING(128),
      comment: '原文件名',
    },
    // 文件大小
    fileSize:{
      type:INTEGER,
      comment: '文件大小',
    },
    mime:{
      type: STRING(32),
      comment: 'mine类型',
    },
    // 状态
    state: BOOLEAN,
  })
  return File;
}