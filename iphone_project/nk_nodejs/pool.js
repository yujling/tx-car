//1.加载mysql模块
const mysql=require("mysql");
//2.创建连接池
var pool=mysql.createPool({
      host:"127.0.0.1",  //连接mysql数据库连接池
      user:"root",  //连接mysql  用户名
      password:"",
      database:"txqc",  //选择操作数据库的名称
      port:3306,  //mysql 端口 默认为3306
      connectionLimit:10  //连接池10个活动连接---为了提升效率
});
//3.导出连接池对象
module.exports=pool;