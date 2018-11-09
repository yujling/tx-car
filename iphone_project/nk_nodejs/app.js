//1.加载模块
//2.创建模块
//3.绑定监听端口
//4.指定静态目录  public
const express=require('express');
const bodyParse=require('body-parser');//加载引入第三方模块
const cors=require('cors');  //加载处理跨域模块
const session=require('express-session');  //引入session 模块 处理登录注册一级购物车操作
const app=express();
//加载图片轮播路由
const imagelist=require('./router/imagelist');
const newslist=require('./router/newslist');
const product=require('./router/product');
const comment=require('./router/comment');
const search=require('./router/search');
const user=require('./router/user');
//配置跨域相关信息
app.use(cors({
    origin:["http://localhost:8080","http://127.0.0.1:8080"],  //允许哪个域名访问
    credentials:true
}))
app.listen(3001);
//__dirname  当前程序所有目录完整路径
app.use(express.static(__dirname+"/public"));
app.use(bodyParse.urlencoded({extended:false}));
//5.将图片轮播模块加载当前应用中指定访问路径
//http://localhost:8080/imagelist/list
app.use(session({
    secret:'随机字符串',
    resave:false,
    saveUninitialized:true
}))
app.use('/imagelist',imagelist);
app.use('/newslist',newslist);
app.use('/product',product);
app.use('/comment',comment);
app.use('/search',search);
app.use('/user',user);