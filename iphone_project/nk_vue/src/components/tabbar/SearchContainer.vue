<template>
   <div id="app_search">
      <p class="searcher">
        <p class="searcher-main">
            <i><img src="../../img/s1.png"/></i>
            <input class="searcher-text" placeholder="请输入关键词" v-model="keyword" @keyup.13="search" number></input>
        </p>
        <p class="searcher-cancel">取消</p>
      </p>
   </div>
</template>
<script>
   import {Toast} from "mint-ui"
   export default{
      data(){
          return {
             keyword:""    //关键词
          }
      },
      methods:{
         search(){
             if(!this.keyword.trim()){
                   Toast("输入内容不能为空！");
                   return;
             }
             console.log(999,this.keyword);
             this.initSearchList();
         },
         //渲染搜索列表  http://www.php.cn/js-tutorial-360515.html
        initSearchList() {
            var url="http://127.0.0.1:3001/search/search?kw="+this.keyword;
            this.$http.get(url).then(res=>{
                //console.log(res.data)
                var ul="<ul class='search_list'>"
                for(var i=0;i<res.data.length;i++){
                   var item=res.data[i];
                   console.log(item)
                   if(item.kw.indexOf("<h3>")==-1){  
                       ul+=`<li class='search_li' ><a  href='#/home/productsdetails/${item.id}'><h3>${item.kw}</h3></a></li>`  
                //   ul+=`<li class='search_li' ><router-link :to='/home/productsdetails/${item.id}'><h3>${item.kw}</h3></router-link></li>` 
                   }else{
                        ul+=`<li class='search_li' ><a href='#/home/newsinfo/${item.id}'>${item.kw}</a></li>` 
                    //    ul+=`<li class='search_li' ><router-link :to='/home/newsinfo/${item.id}'>${item.kw}</router-link></li>` 
                   }
                  console.log(i);    
                }
                 ul+="</ul>";
                 //console.log(ul);
                 //document.getElementById("app_search").innerHTML+=ul;
                 //console.log($("#app_search"))
                $("#app_search").append(ul);
            })
            // var List = $('.searcher-land ul');
            // var params = {};  //定义一个参数对象
            //搜索过滤字符
            // var SEARCH_KEY = $('.searcher-text').val()  //输入框中的值
            // params['action'] = 'get_search_key_list';
            // params['market_iid'] = 1001;
            // params['search_type'] = "type";
            // var epm={} ;
            // //设置缓存
            // epm.setLocalItem = function(key, value) {
            // if (window.localStorage) {
            // localStorage.setItem(key, value);
            // } else {
            // //后备方案
            // setCookie(key, value);
            // }
            // };
            // //提取缓存
            // epm.getLocalItem = function(key) {
            // if (window.localStorage) {
            // return localStorage.getItem(key);
            // } else {
            // //后备方案
            // return getCookie(key);
            // }
            // };
            // //删除缓存
            // epm.removeLocalItem = function(key) {
            // if (window.localStorage) {
            // localStorage.removeItem(key);
            // } else {
            //后备方案
        //     removeCookie(key);
        //     }
        //     };
        //    params['search_key'] = this.replaceIllegalStr(SEARCH_KEY);
        //     this.$http.get(params).then(result=> {
        //     console.log(result);
        //     console.log(TYPE)
        //     var html = '';
        //     List.html('');
        //     //有结果
        //     if(result.data.length > 0) {
        //     $.each(result.data, function(index, value) {
            //     goodName = value['goods_name'];
            //     shopName = value['shop_name'];
            //     //判断Name类型
            //     itemName = (goodName) ? goodName : shopName;
            //     html += '<li class="goods-list">' + itemName + '</li>'
            // });
            // $('.searcher-list').html(html);
            // }
            //无结果
            // else {
            // html = '<p class="no-goods">暂时无法找到此选项~</p>';
            // $('.searcher-list').html(html);
            // }
            // });
        },
        replaceIllegalStr(str) { //此函数类似正则,目的是过滤掉一些无用的符号以免给后端接收数据带来不必要的麻烦。
            var reg;
            var illegal_list = ["/", "\\",  //非法列表
            "[", "]",
            "{", "}",
            "<", ">",
            "＜", "＞",
            "「", "」",
            "：", "；",
            "、", "•",
            "^", "'", "\"",
            "\r", "\r\n", "\\n", "\n"];
            for (var i = 0; i < illegal_list.length; i++) {
            if (str.indexOf(illegal_list[i]) >= 0) {  //如果关键词中含有非法列表中的某个值
                if (illegal_list[i] == '\\' || illegal_list[i] == '[') {
                    reg = new RegExp('\\' + illegal_list[i], "g"); //正则表达式1
                } else {
                    reg = new RegExp(illegal_list[i], "g");    //正则表达式2
                }
                str = str.replace(reg, '');
              }
             }
            return str.trim();
            }    
    },
    watch:{  //监视函数
       keyword(){    //keyword为模型变量名，只要keyword一发生变化，就会自动执行该监视函数
            console.log(111,this.keyword);
            this.initSearchList();
                //  $('.searcher-text').on("input",(e)=>{  //监听input框，实时渲染
                //   // initSearchList();
                //    console.log(1);
                // })
       }
    },
    created(){
        
    }
} 
</script>
<style >  
#app_search{
    background:#f0f0f0;
    margin:0 3px 0 3px;
} 
.searcher-main>i>img{
    width:6%;
    margin:3px 18px 1px 3px;
}
.searcher{
    position:relative;
    top:10px;
    height:35px;
    background:#fff;
    width:70%;
    margin:0 auto;
    border-radius:8px;
}
.searcher-main{
    position:absolute;
    top:52px;
    left:65px;
}
.searcher-main>input{
    border:0;
    width:60%;
    margin-bottom:15px;
    outline:none;
}
.searcher-cancel{
    position:absolute;
    right:15px;
    top:60px;
}
.search_list{
    background:red;
    padding-top:15px;
    
}
.search_li{
    border-bottom:1px solid #eee !important;
    padding:5px;
    margin-bottom:3px;
}
.search_list h3{
    font-size:16px;
    color:#000;
    line-height:16px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    
}
</style>