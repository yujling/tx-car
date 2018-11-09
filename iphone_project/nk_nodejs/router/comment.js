const express=require("express");
const pool=require("../pool");
const router=express.Router();
//功能1:根据新闻id分页显示评论的内容
router.get('/comment',(req,res)=>{
    //1.参数  pno pagesize nid
    var {pno,pagesize,nid}=req.query;
    if(!pno){pno=1}
    if(!pagesize){pagesize=6}
    var obj={pno:pno,pagesize:pagesize};
    var pageCount;
    var process=0;   //发送数据的状态判断,process为100时，向前端发送数据
    //2.sql语句
    //2.1 查询总评论数
    var sql="SELECT count(nid) as num from tx_comment WHERE nid=?";
    pool.query(sql,[nid],(err,result)=>{
        if(err) throw err;
        //console.log(result);
         pageCount=Math.ceil(result[0].num/pagesize);
         obj.pageCount=pageCount;
         process+=50;
         if(process==100){
            //console.log(1,process);
             res.send({code:1,msg:obj});
         }
    });
    //3.发送数据返回前端
    //2.2 nid下的新闻
    var offset=parseInt((pno-1)*pagesize);
    // console.log(offset)
    var sql="SELECT `cid`, `nid`, `click`, `atav`, `ctime`, `content`, `username`, `isdel` FROM `tx_comment` WHERE nid=? ORDER BY ctime DESC LIMIT ?,? ";
    pool.query(sql,[nid,offset,pagesize],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            obj.data=result;
            process+=50;
        }
        if(process==100){
            //console.log(2,process);
            res.send({code:1,msg:obj});
        }     
    })
})
//功能2:插入新闻评论
router.get('/com',(req,res)=>{
    var {comments,nid}=req.query;
    if(!comments.trim().length){
        res.send({code:-1,msg:"评论内容为空"});
    }
    var sql="INSERT INTO `tx_comment`(`cid`, `nid`, `click`, `atav`, `ctime`, `content`, `username`, `isdel`) VALUES (null,?,0,'http://127.0.0.1:3001/img/atav/t29.jpg',now(),?,'匿名用户',0)";
    pool.query(sql,[nid,comments],(err,result)=>{
        if(err) throw err;
        //console.log(result);
        if(result.affectedRows==1){
        res.send({code:1,msg:result});     
      }else{
          res.send({code:-1});
      }
    });

})
module.exports=router;