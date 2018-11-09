<template>
   <div class="app_home">
      <!--第一部分:图片轮播  1.3使用轮播图子组件-->
        <swiper-box   :list="imagelist"></swiper-box>
      <!--第二部分:六宫格-->
         <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                    <img src="../../img/menu6.png"/>
                    <div class="mui-media-body">新闻资讯</div></router-link ></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/productslist">
                    <img src="../../img/menu2.png"/>
                    <div class="mui-media-body">商品</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/cart">
                   <img src="../../img/menu3.png"/>
                    <div class="mui-media-body">购物车</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/position">
                    <img src="../../img/menu1.png"/>
                    <div class="mui-media-body">定位</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/menulist">
                    <img src="../../img/menu5.png"/>
                    <div class="mui-media-body">订单</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/pay">
                    <img src="../../img/menu4.png"/>
                    <div class="mui-media-body">支付</div></router-link></li>
     </ul> 
      <!--第三部分:超值购买-->
      <div class="title">
				<h4>超值购买</h4>
			</div>
       <div id="cx_container">
          <div class="app-goods-item" v-for="item in list1" >
           <router-link :to="'/home/productsdetails/'+item.lid"> 
            <img :src="item.pic" id="cz_img">
            <h5 class="title1">{{item.title}} </h5>
            <div class="info">     
                    <span class="price">￥{{item.price}}</span> 
                   <mt-button class="btn_bgcolor" size="small">立即抢购</mt-button>
            </div>
            </router-link>
          </div>
        </div>
      <!--第四部分：试驾夺宝-->
      <div class="title_sj">
				<h4>试驾夺宝</h4>
			</div>
       <div id="sj_container">
          <div class="app-goods-item" v-for="item in list2" >
           <router-link :to="'/home/productsdetails/'+item.lid">
            <img :src="item.pic" id="cz_img">
            <h5 class="title1 title1_bg">{{item.title}} </h5>
            <div class="info">     
                    <span class="price">￥{{item.price}}</span> 
                   <mt-button class="btn_bgcolor"  size="small">立即抢购</mt-button>
            </div>
            </router-link>
          </div>
        </div>
   </div>
</template>
<script>  
    //1.1导入图片轮播子组件
    import swiper  from "../subcomponents/swiper"
    export default{
      data(){
        return {
          list1:[],  //超值购买
          list2:[],   //试驾宝典
          imagelist:[]
        }
      },
      methods:{
         getImagelist(){
           this.$http.get("imagelist/list").then(result=>{
                 if(result.body.code==1){
                   this.imagelist=result.body.msg;
                 }
           })
         },
          getlist(){
        this.$http.get("product/list").then(result=>{
               this.list1=result.body.msg.data.slice(0,4);
               this.list2=result.body.msg.data.slice(-4);
        })
      }
      },
      created(){
         this.getImagelist(),
         this.getlist()
      },
      components:{  //1.2注册轮播图子组件
        "swiper-box":swiper
      }
    }
</script>
<style>
    #app ul{
        background-color:#FFFFFF;
    }
    #app ul>li{ 
        border:0;
    }
  .app_home{
       background:#f0f0f0;
       margin:0 3px 0 3px;
     }
  #app>.app_home>ul.mui-table-view>li.mui-table-view-cell>a>img{
    width:50%;
  }
   .title{
     padding:5px;
   }
   .title_sj{
     padding:5px;
   }
   .title>h4,.title_sj>h4{
  
     margin:10px 0 10px 5px;
   }
   .mui-media-body>.mint-button{
     float:right;
   }
   #cz_img{
     width:100%;
   }
    #cx_container,#sj_container{
      display:flex;
      justify-content:space-between;
       flex-wrap: wrap;
    } 
     #cx_container>div.app-goods-item, #sj_container>div.app-goods-item{
       width:49% !important;
       background:#FFFFFF; 
       border:1px solid #ddd;
       margin-bottom:8px;
     }
     .title1{
       font-size:12px;
       line-height:25px;
       color:#999;
       text-align:center;
       margin:25px 0 25px 0;
       }
       .info{
         display:flex;
         justify-content:space-between;
         margin-bottom:18px;
       }
       .price{
         display:inline-block;
         color:#000;
         width:90px;
         border-radius:3px;
         font-size:18px;
         padding:6px 13px 4px 13px;
       }
       .info>button{
         margin-right:3px;
          background:#0FCBB8;
       }
       .info>button>.mint-button-text{
         color:#fff;
       }
   /*
     }*/
     /*http://www.vip9168.com/Goods/Index
   http://automall.qq.com/web*/ 
</style>