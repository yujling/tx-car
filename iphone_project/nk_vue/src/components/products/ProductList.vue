<template>
   <div class="goods-list">
          <div class="app-goods-item" v-for="item in productlist" >
           <router-link :to="'/home/productsdetails/'+item.lid"> 
            <img :src="item.pic" id="cz_img"> 
            <h5 class="title1">{{item.title}}</h5>
            <div class="info">     
                    <span class="price">￥{{item.price}}</span> 
                   <mt-button type="primary" size="small">立即抢购</mt-button>
            </div>
            </router-link>
          </div>
          <mt-button type="primary" id="btn" size="large" @click="getMore" >加载更多</mt-button>
   </div>
</template>
<script>
import jquery from "jquery-1.11.3.js"
 export default {
     data(){
         return {
            productlist:[],
            pno:0
         }
     },
     methods:{
       getDetail(id){
           this.$router.push("/home/goodsinfo/"+id);
       },
       getMore(){
           this.pno++;
           var url="product/list?pno="+this.pno;
           this.$http.get(url).then(res=>{
               this.productlist=this.productlist.concat( res.body.msg.data);
               var p=res.body.msg.pageCount;
               if(this.pno==p){
                    var btn=document.getElementById("btn");
                    btn.style.display="none";
               }
              // console.log( this.productlist);
            
           })
       }
     },
     created(){
         this.getMore();
     }
 }
</script>
<style>
   .goods-list{
       display:flex;
       justify-content:space-between;
       flex-wrap:wrap;
       background:#f0f0f0;
       margin:0 3px 0 3px;
   }  
    .goods-list>div{
        width:49%;
        background:#fff;
        margin-bottom:8px;
    }
    .goods-list>title1{
         color:#0FCBB8;
    }
    .goods-list .price{
        display:inline-block;
        width:90px;
        border-radius:3px;
         color:#FFFFFF;
         background-color: rgba(255, 113, 0, 0.54);
         font-size:18px;
         padding:6px 13px 4px 13px;
    }
</style>
