<template>
   <div id="app_swiper">
     <mt-swipe :auto="4000" >
        <mt-swipe-item v-for="item in list" :key="item.id">
            <img :src="item.img_url" />
        </mt-swipe-item>
     </mt-swipe>
   </div>
</template>
<script>
    export default{
        date(){
            return {
                //list:[]   //不用在data中再次声明list
            }
        },
        methods:{
        },
        props:["list"],   //父元素传递数据
        created(){
        }
    }
</script>
<style >
    #app_swiper{
       height:200px;
    }
    #app_swiper .mint-swip .mint-swip-item{
        text-align:center;
    }
   #app_swiper>.mint-swipe>.mint-swipe-items-wrap>.mint-swipe-item>img{
        width:100%;
        height:100%;
    }
</style>