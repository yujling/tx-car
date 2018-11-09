//功能1:新闻的分页显示
//1.加载模块
//2.创建路由对象
//3.完善功能
//4.导出路由对象
const pool=require("../pool.js");
const express=require("express");
const router=express.Router();
router.get('/list',(req,res)=>{
    //1.参数  pno  pagelist
   var  {pno,pageSize}=req.query;
   //2.设置参数默认值
   if(!pno)
      pno=1;
      if(!pageSize)
         pageSize=10;
    var reg=/^[0-9]{1,}$/;
    //3.验证用户输入
    if(!reg.test(pno)){
        res.send({code:-1,msg:"页面格式不正确"});
        return;
    }
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:"页大小格式不正确"});
        return;
    }
   // res.send({code:1,msg:"ok"+pno+":"+pageSize});
    //4.创建2条sql发送  总记录数op
    //4.1创建空对象保存返回数据
    var obj={pno:pno,pageSize:pageSize};
    //4.2创建变量保存(sql语句完成)进度
    var progress=0;
   var sql=`SELECT count(id) as c FROM tx_news`;
   pool.query(sql,(err,result)=>{
       if(err)  throw err;
       //console.log(result);  //[ RowDataPacket { c: 26 } ]
      // console.log(result[0].c);
       var pageCount=Math.ceil(result[0].c/pageSize);
       obj.pageCount=pageCount;
       progress+=50;
       if(progress==100){
           res.send({code:1,msg:obj})
       }
   })
   //5.创建2条SQL发送  当前内容
   var sql=`SELECT id,title,ctime,click FROM tx_news  LIMIT ?,?`;
   var offset=parseInt((pno-1)*pageSize);
   pageSize=parseInt(pageSize);
   pool.query(sql,[offset,pageSize],(err,result)=>{
       if(err) throw err;
       //console.log(result);   
       obj.data=result;  //保存当前页的内容
       progress+=50;     //进度+50
       if(progress==100){
           res.send({code:1,msg:obj})    //如果2条sql语句全部完成就发送
       }
   })
    /* var sql2=`SELECT `*/
})
//获取新闻详细信息
router.get('/newsinfo',(req,res)=>{
    var id=req.query.id;
    //console.log(id);
    var sql="SELECT `id`, `title`, `content`, `click`, `img_url`, `price`, `ctime` FROM `tx_news` WHERE  id=?";
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        //console.log(2,result);
        res.send({code:1,msg:result});
    })
})
module.exports=router;