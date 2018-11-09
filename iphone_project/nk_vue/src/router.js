import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import ShopContainer from "./components/tabbar/ShopContainer.vue"
import NewsListContainer from "./components/news/Newslist.vue"
import NewsInfoContainer from "./components/news/NewsInfo.vue"
import Productlist from "./components/products/ProductList.vue"
import Productdetails from "./components/products/ProductDetails.vue"
import PositionContainer from "./components/position/postionContainer.vue"
import MenuContainer from "./components/menulist/Menulist.vue"
import Paycontainer from "./components/pay/Paymethod.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path:"/",redirect:"/home"}, 
    {path:'/home',component:HomeContainer},
    {path:'/member',component:MemberContainer},
    {path:'/search',component:SearchContainer}, 
    {path:'/cart',component:ShopContainer}, 
    {path:'/home/newslist',component:NewsListContainer}, 
    {path:'/home/newsinfo/:id',component:NewsInfoContainer},  
    {path:'/home/productslist',component:Productlist},  
    {path:'/home/productsdetails/:lid',component:Productdetails}, 
    {path:'/position',component:PositionContainer},
    {path:'/menulist',component:MenuContainer},
    {path:'/pay',component:Paycontainer}    
  ],linkActiveClass:"mui-active" 
})
