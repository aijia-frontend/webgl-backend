module.exports = appInfo => {
  const config = (exports = {});
  config.sequelize = {
    dialect: "mysql",
    host: "106.15.203.69",
    port: 3306,
    database: "webgl",
    username: "root",
    password: "Jrh20060607+",
    //underscored: true,  // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
    timezone: '+08:00', // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
  };
  return {
     ...config
  }
}