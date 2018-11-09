const express=require('express');
const pool=require('../pool');
const router=express.Router();
router.get("/list",(req,res)=>{
    //1.从数据库里查找需要的商品数量-->得到商品总数-->得到商品共有几页
       //1.1参数  页码大小  页码
       var {pno,pageSize}=req.query;
       //判断参数
       if(!pno)  pno=1;  //pno为0或没有时，显示第一页的商品
       //console.log(1,pno);
       if(!pageSize)   pageSize=6;  //默认为每页6条商品信息
       //console.log(2,pageSize);
        var reg=/^[0-9]{1,}$/;
        if(!reg.test(pno)){
           res.send({code:-1,msg:"页码格式不正确！"});
           return;
        }
        if(!reg.test(pageSize)){
            res.send({code:-2,msg:"页码大小格式不正确！"});
            return;
        }
        //创建一个变量对象  保存所有要发送给前端的信息
        var obj={pno:pno,pageSize:pageSize}
        //创建变量保存sql语句完成进度
        var progress=0;  
        var sql="SELECT count(`lid`) as num FROM `tx_laptop`";
        pool.query(sql,(err,result)=>{  //查找商品的总数
             if(err)  throw err;
              //console.log(result[0]); //[ RowDataPacket { num: 8 } ]
              var pageCount=Math.ceil(result[0].num/pageSize); 
              obj.pageCount=pageCount;
              progress+=50;
              if(progress==100){
                res.send({code:1,msg:obj});
                }
              //console.log(pageCount);
        })
     //按照用户发来的请求(请求的页数,每页大小)发送所需要的商品信息到前端
    var offset=parseInt((pno-1)*pageSize); //注意LIMIT 后的两个参数;
                                            //第一个是总数中的第几个参数(从0开始),第二个是每页有多少条数据 
    var sql="SELECT `lid`, `family_id`, `title`, `price`, `pic` FROM `tx_laptop` LIMIT ?,?";
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err; 
        obj.data=result;
         progress+=50;
        if(progress==100){
        res.send({code:1,msg:obj});
        }
    })
})
router.get("/detailslist",(req,res)=>{
      var lid=req.query.lid;
      var sql="SELECT `lid`, `family_id`, `title`, `subtitle`, `price`, `range_price`, `promise`, `spec`, `lname`, `details`, `ptype`, `sale_time`, `shelf_time`, `sold_count`, `remain_count`, `is_onsale`, `old_price`, `new_price` FROM `tx_laptop_details` WHERE lid=?";
      pool.query(sql,[lid],(err,result)=>{
            if(err) throw err;
          if(result.length>0){
              res.send({code:1,msg:result})
          }else{
              res.send({code:-1,msg:result})
          }
      })
})

module.exports=router;