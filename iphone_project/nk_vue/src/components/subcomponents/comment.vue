<template>
   <div class="cmt-contaner">
      <h4>评论列表</h4>
      <textarea placeholder="请输入您的评论内容..." rows="3" cols="20" maxlength="120" v-model="comments"></textarea>
       <mt-button  size="large" @click="getCom">发表评论</mt-button>
       <ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" v-for="item in list">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="item.atav">
						<div class="mui-media-body">
							{{item.username}}
							<p class='mui-ellipsis'>
							   <p>{{item.content}}</p>
                              <span class="cmt_ctime">{{item.ctime |dateFormat}}</span>
                              <span class="cmt_click">{{item.click}}</span>
                            </p>
						</div>
					</a>
				</li>
			</ul>
			<mt-button id="btn_more" size="large" @click="getMore">加载更多....</mt-button>
   </div>
</template>
<script>               
  import {Toast} from "mint-ui"
   export default{
	   data(){
		   return {
			   list:[],   //存放评论的相关数据
			   comments:"",  //评论的内容
			   pno:0      // 显示当前页码
		   }
	   },
	   methods:{ 
		   getCom(){
			   if(!this.comments.trim().length){
			     Toast("亲，评论内容不能为空哦~~~");
			      return;
			   }
			   var url="comment/com?nid="+this.nid+"&comments="+this.comments;
			   this.$http.get(url).then(result=>{
                    if(result.body.code==1){
						this.comments="";
						window.history.go(0);
						Toast("评论成功！");
						
					}
			   })
		   } ,                             
			getMore(){
				 this.pno++;
				 console.log(222,this.pno);
				 var url="comment/comment?nid="+this.nid+"&pno="+this.pno;
				 this.$http.get(url).then(result=>{
					 console.log(result.body.msg.data)
				     this.list=this.list.concat(result.body.msg.data);
					 var p=result.body.msg.pageCount;
                     var btn=document.getElementById("btn_more");
					 if(p==this.pno){
                       btn.style.display="none";
					 }
				 })
			}
	   },
	   created(){
            this.getMore();
	   },
	   props:["nid"]
   }
</script>
<style scoped>
   .cmt-contaner{
       margin:5px 3px 0px 3px;
   }
   .cmt-contaner>h4{
	   font-size:18px;
	   line-height:18px;
	   color:#FF772B;
	   padding:10px 0 10px 0;
	   text-align:center;
   }
   .cmt-contaner>textarea{
	   border:1px solid #ddd;
   }
   .cmt-contaner>button{
	    background:#0FCBB8;
		margin-bottom:20px;
		color:#fff;
   }
    span.cmt_ctime{
		font-size:6px;
		color:#0FCBB8;
	}
    span.cmt_click{
       float:right;
	   font-size:6px;
	   color:#0FCBB8;
   }
    p.mui-ellipsis{
       color:#999;
	   font-size:12px;
   }
</style>