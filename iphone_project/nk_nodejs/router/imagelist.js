const express=require("express");
const pool=require('../pool.js');
const router=express.Router();
//用户希望获取图片轮播列表
//用户的请求方式:get post delete put head option  trace  connect
//发给客户端的文件类型；text   xml   json(占空间少，易于处理)
  router.get('/list',(req,res)=>{
         var data=req.query;
         var sql=`SELECT id,img_url,title FROM tx_imagelist; `;
         pool.query(sql,(err,result)=>{
             //如果在执行操作的时候出错，抛出错误
               if(err)  throw err;
               //1  执行正确   -1  -2 -3 告诉程序,操作失败  
                res.send({code:1,msg:result});
         })
  });
module.exports=router;