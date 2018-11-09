<template>
   <div id="app_newsinfo" >
          <p v-html="newslist.title"></p>
         <img src="../../img/sj4.jpg" />
         <div v-html="newslist.content" class="news_content"></div>
         <comment-box :nid="id"></comment-box>
   </div>
</template>
<script>
  import comment from "../subcomponents/comment.vue"
   export default{
          data(){
              return {
                  id:this.$route.params.id, 
                  newslist:[],
                 
              }
          },
         
          methods:{
              getnewsinfo(){
                 this.$http.get("newslist/newsinfo?id="+this.id).then(res=>{
                      this.newslist=res.body.msg;
                      this.newslist=this.newslist[0];
                      //console.log(this.newslist);
                 })
              }
          },
           created(){
              this.getnewsinfo();
          },    
          components:{
          //用来注册子组件
          "comment-box":comment
      }

   }
</script>
<style>
    #app_newsinfo{
      background:#fff;
      margin:0 3px 0 3px;
    }
    #app_newsinfo>p>h3{
        color:#000;
        margin-left:5px;
        font-size:24px;
        line-height:24px;
        padding:20px 0 20px 0;
        text-align:center;
        border-bottom: 1px solid #f0f0f0;
    }
    #app_newsinfo>img{
        padding:10px 0 10x 0;
        width:100%;
    }
     .news_content{
        margin:5px 10px 5px 10px;
        text-align:justify;  /* 文本两端对齐*/
        text-justify: inter-ideograph;/*IE*/
       padding:30px 0 30px 0;
       border-top:1px solid #ddd;
       border-bottom:1px solid #f0f0f0;
     }
    .news_content>h6{
        font-size:16px;
        text-indent:35px;
        line-height:20px;
    }
</style>