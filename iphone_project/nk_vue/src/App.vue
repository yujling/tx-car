<template>
  <div id="app"  class="app-container">
      <!--头部-->
       <mt-header fixed title="腾讯汽车商城">
          <mt-button slot="left" icon="back" @click="handleBack">返回</mt-button>
          <mt-button slot="right" icon="search" @click="search"></mt-button>
       </mt-header>
       <router-view></router-view>
       <!--tablebar-->
       <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-tao " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
      </router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
      <router-link class="mui-tab-item-tao" to="/cart">
				<span class="mui-icon  mui-icon-extra mui-icon-extra-cart">
         <span class="mui-badge">{{$store.getters.optCount}}</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
      <router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
  </div>
</template>
<script>
  export default{
     data(){
       return {}
     },
     methods:{
       handleBack(){
         window.history.go(-1);
       },
       search(){
         this.$router.push("/search")
       }
     }
  }
</script>
<style>
  header.mint-header{
    background-color:#0FCBB8;
  }
   #app>h1>.mint-header-title{
     margin-left:0px;
     font-size:18px !important;
   }
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;
}
nav.mui-bar>a.mui-active{
  color:#0FCBB8 !important;
}
nav.mui-bar>a>span.mui-icon>span.mui-badge{
  background:#FF772B !important;
}
</style>
