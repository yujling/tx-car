import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Header,Swipe,SwipeItem,Button } from 'mint-ui';
import'mint-ui/lib/style.css';

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

Vue.config.productionTip = false
// 3: 导入 vue-resource   官方发送ajax请求的组件
import VueResource from 'vue-resource'  
// 4:配置VueResource 
Vue.use(VueResource)

import Vuex from 'vuex'   //①引入Vuex组件
Vue.use(Vuex)  //注册组件中所有内容
//创建Vuex对象:共享数据  操作方法  获取并监听数据方法
var store=new Vuex.Store({
  state:{  //保存共享数据
        cartCount:0  //共享数据购物车中的数据
  }, 
  mutations:{ //操作共享数据的方法
       increment(state,num){state.cartCount+=num},
       substract(state){state.cartCount-=num},
       clearcount(state){state.cartCount=0}
  },
  getters:{   //获取并监听数据方法
     optCount:function(state){
       return state.cartCount;
     }
  }
});  //②创建对象
// var store = new Vuex.Store({
//   state:{ count:0},
//   mutations:{
//      increment(state){
//        state.count++
//      },
//      substract(state,obj){
//        console.log(obj);
//        state.count -= (obj.c + obj.d)
//      }
//   },
//   getters:{
//     optCount:function(state){
//       return '###'+state.count;
//     }
//   }
// })
//5: 设置请求的根路径 
Vue.http.options.root = "http://127.0.0.1:3001/"; 
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//引入jQuery文件
import $ from '../public/jquery-1.11.3'
//定义全局(日期格式)过滤器
//第三方模块  moment 过滤器日期
//自定义过滤器
// dateFormat 过滤器名称  datestr   用户日期 
Vue.filter("dateFormat",function(datestr,pattern="YYYY-MM-DD"){
     return new Date(datestr).toLocaleString();
})        


new Vue({
  router,
  render: h => h(App),
  store  //③将Vuex对象注册到vue对象中
}).$mount('#app')
