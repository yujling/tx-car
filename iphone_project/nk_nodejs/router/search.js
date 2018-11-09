const express=require("express");
const pool=require("../pool");
const router=express.Router();
router.get('/search',(req,res)=>{
    var kw=req.query.kw;  // 获取所有用户输入的关键词
    //console.log(1,kw);
    // var sql="SELECT title as kw FROM tx_laptop_details WHERE title like "%?%" UNION SELECT title as kw FROM tx_news WHERE title like "%?%"";
    var kws=kw.split(" ");  //提取关键词
    //console.log(2,kws);
    kws.forEach((elem,i,kws)=>
      kws[i]=` title like '%${elem}%' `
      )
      //console.log(3,kws);
    var where=` where ${kws.join(" and ")} `
    var sql1=` SELECT title as kw,lid as id FROM tx_laptop_details  `;
    sql1+=where;
    var sql2=` UNION SELECT title as kw,id as id  FROM tx_news  `;
    sql2+=where;
    var sql=sql1+sql2;
    var data={};
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
module.exports=router;