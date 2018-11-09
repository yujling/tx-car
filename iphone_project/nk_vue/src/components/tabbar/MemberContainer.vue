<template> 
   <div id="app_login">
   <!--注册-->
    <div id="register" >
      <div class="login_box_uname">
        <img src="../../img/uname.png" class="box_img"/>
       <input type="text" class="box_input" placeholder="请输入用户名" v-model:input="uname">
     </div> 
     <div class="login_box_upwd ">
        <img src="../../img/upwd.png" class="box_img" />
       <input type="password" class="box_input" placeholder="请输入密码" :input="upwd">
     </div>
     <div class="login_box_login ">
       <a href="#">注册</a>
     </div>
     <div class="ot">
        <a herf="#" class="forget" >已有账号</a>
        <a href="#" class="reg" >立即登录</a>
     </div>
    </div>
     <!--登录-->
     <div id="login" >
      <div class="login_box_uname">
        <img src="../../img/uname.png" class="box_img"/>
        <input type="text" class="box_input" placeholder="请输入用户名" v-model:value="uname">
      </div> 
      <div class="login_box_upwd ">
        <img src="../../img/upwd.png" class="box_img" />
        <input type="password" class="box_input" placeholder="请输入密码" v-model:value="upwd">
      </div>
      <div class="login_box_login ">
       <a href="#" @click="postLogin">登录</a>
      </div>
    <div class="ot"><a herf="#" class="forget">忘记密码?</a><a href="#" class="reg" @click="postRegister">立即注册</a></div>
    </div> 
   <!--
    <img src="../../img/beijing2_01.png" class="login_img"/> 
    <div class="login_box">
        <img src="../../img/uname.png" class="box_img"/>
       <input type="text" id="box_input">
    </div>    
    <div class="login_box">
        <img src="../../img/upwd.png" class="box_img"/>
       <input type="password" id="box_input">
    </div>  -->    
   </div>
</template>
<script>
import {Toast} from "mint-ui"
  export default {
      data(){
          return {
              islogin:false, //判断用户登录状态
              uname:"",
              upwd:""
          }
      },
      methods:{
          postLogin(){
              console.log(this.uname,this.upwd);
              var uname=this.uname;
              var upwd=this.upwd;
              if(!uname){
                  Toast("用户名不能为空！");
                  return;
              }
              if(!upwd){
                  Toast("密码不能为空");
                  return;
              }
              var url="user/signin?uname="+uname+"&upwd="+upwd;
              this.$http.get(url).then(res=>{    
                  //console.log(res.body);
                  if(res.body.code==1){
                      Toast("登录成功！返回主页");
                      this.islogin=true;
                      setTimeout(()=>{
                          this.$router.push("/home");}
                          ,3000)  
                  }else{
                      Toast("登录失败！");
                  }
              })
          },
          postRegister(){
              $("log").style.display="none";
              $("register").style.display="block";
          }
      }

  }
</script>
<style >
#log{
    display:block;
}
#register{
    display:none;
}
#app_login{
     margin:0 3px 0 3px;
     background:url(../../img/beijign.png) no-repeat;
     background-size:100%  100%;
     width:100%;
     height:575px;
}
.login_img{
    width:100%;
    height:220px;
}
.login_box_uname,.login_box_upwd{
    position:relative;
    width:80%;
    top:150px;
    height:45px;
    margin:0 auto;
    border-radius:28px;
    background:rgba(255,255,255,.6)!important;
} 
input{
    color:#eee !important;
}
.login_box_login{
     position:relative;
    width:80%;
    top:268px;
    height:45px;
    margin:0 auto;
    border-radius:28px; 
    background:#0FCBB8;
}
.login_box_upwd{
    top:190px;
}
.box_img{
    width:8%;
    position:absolute;
    left:20px;
    top:9px;
}
#app_login .box_input{
    width:80%;
    position:absolute;
    left:52px;
    border-radius:0;
    outline:0;
    border:0;
    background:rgba(255,255,255,0);
}
.ot{
    position:absolute;
    top:448px;
    width:80%;
    margin:0 auto;
    left:50px;
    font-size:12px;
}
.ot>a{
    color:#f0f0f0;
}
input:-webkit-autofill{
  background: rgba(255, 255, 255,.0) !important;
}
.login_box_login>a{
    display:block;
    width:100%;
    height:100%;
    color:#fff;
    text-align:center;
    font-size:18px;
    line-height:45px;
   
}
.forget{
    position:absolute;
    left:35px;
    color:rgba(255,255,255,.7);
}
.reg{
    position:absolute;
    left:174px;
    color:rgba(255,255,255,.7);
}
/*修改placeholder 的样式 */
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color:#9E9E9E;
    font-size:16px;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:#9E9E9E;
   font-size:16px;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:#9E9E9E;
   font-size:16px;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
   color:#9E9E9E;
   font-size:16px;
}
/*
#app_login #box_input{
    height:40px;
    left:30px;
    position:absolute;
    
}*/
</style>