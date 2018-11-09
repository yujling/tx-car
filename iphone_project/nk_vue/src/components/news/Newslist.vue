<template>
  <div id="app_newslist">
     <h3>新闻列表</h3>
    <ul class="mui-table-view ">   
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
					<router-link class="mui-navigate-right" :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" src="../../img/xw.png" />
						<div class="mui-media-body">
							<h3 v-html="item.title"></h3>
							<p class='mui-ellipsis'>
                            <span class="font_ctime">{{item.ctime |dateFormat}}</span>
                            <span class="font_click">点击:{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
     </ul>
    <mt-button  size="large" @click="getMore"   id="btn1">加载更多...</mt-button>
  </div>
</template>
<script>
    export default{
        data(){
            return {
                list:[],
                pageIndex:0  //页码
            }
        },
        methods:{
            getMore(){
                //console.log(111);
                this.pageIndex++;     //页码加1
                var url ="newslist/list?pno="+this.pageIndex;
                this.$http.get(url).then(result=>{
                   console.log(result.body);
                    // this.list=result.body.msg.data;  //数据拼接存在问题，会覆盖前一页数据
                    //完成功能，加一个提示，获取成功
                   this.list= this.list.concat(result.body.msg.data);  
                     var p=result.body.msg.pageCount;
                     var btn1=document.getElementById("btn1");
                     if(p==this.pageIndex){
                       btn1.style.display="none";
                     }
                })
          }
        },
        created(){
                this.getMore();
     }        
        
    }
</script>
<style >
    #app_newslist{
        margin:0 3px 0 3px;
    }
    #app_newslist .mui-table-view{
        background:#f0f0f0;
    }
    /* 新闻标题*/
    #app_newslist .mui-table-view h3{
         font-size:16px;
         line-height:26px;
         font-family:YouYuan;
         overflow:hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
         color:#000;
    }
      #app_newslist>.mui-table-view>.mui-table-view-cell{
          background:#fff;
          margin-bottom:10px;
          padding:20px;
      } 
    #app_newslist li .mui-ellipsis{
        font-size:12px;
        color:#226aff;
        display:flex;
        justify-content:space-between;
    }
    #app_newslist li .font_ctime{
        color:#999;
    }
     #app_newslist li .font_click{
         color:#FF772B;
     }
     #app_newslist>ul.mui-table-view>li.mui-table-view-cell img{
         width:100%;
         
     }
     #app_newslist >button{
         background:#0FCBB8;
         color:#fff;
     }
</style>