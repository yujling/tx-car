<!--<template>
    <div id="app_position">      
     <div id="allmap"></div>
    </div>
</template>
<script>
    import {MP} from './mp.js'
    export default{
       data () {
      return {
      }
    },
    methods: {
         addressDetail(){ //获取地理位置
                var vm = this;
            //     if (!vm.now){
            //      return
            //  }
             console.log(vm);
             //alert(111)
             //全局的this在方法中不能使用，需要重新定义一下
                var geolocation = new BMap.Geolocation();
                var gc = new BMap.Geocoder();
                console.log(geolocation,gc);
                geolocation.getCurrentPosition( function(r) {   //定位结果对象会传递给r变量
                        if(this.getStatus() == BMAP_STATUS_SUCCESS)
                        {  //通过Geolocation类的getStatus()可以判断是否成功定位。
                            var pt = r.point;
                            gc.getLocation(pt, function(rs){
                                var addComp = rs.addressComponents;
                                //这里弹出的便是定位的地理位置
                                alert(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
                                vm.now = false
                                //这里把位置存在session里面就可以在后面用了
                                sessionStorage.setItem("dAddress",addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber)
                            });
                        }
                        else
                        {
                            //关于状态码
                            //BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。
                            //BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
                            //BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。
                            //BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
                            //BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。
                            //BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。
                            //BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
                            //BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)
                            //BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)
                            switch( this.getStatus() )
                            {
                                case 2:
                                    alert( '位置结果未知 获取位置失败.' );
                                    break;
                                case 3:
                                    alert( '导航结果未知 获取位置失败..' );
                                    break;
                                case 4:
                                    alert( '非法密钥 获取位置失败.' );
                                    break;
                                case 5:
                                    alert( '对不起,非法请求位置  获取位置失败.' );
                                    break;
                                case 6:
                                    alert( '对不起,当前 没有权限 获取位置失败.' );
                                    break;
                                case 7:
                                    alert( '对不起,服务不可用 获取位置失败.' );
                                    break;
                                case 8:
                                    alert( '对不起,请求超时 获取位置失败.' );
                                    break;
                            }
                        }

                    },
                    {enableHighAccuracy: true})
            }
    },
    created(){
       this.addressDetail()
    },  
mounted(){
		    this.$nextTick(function(){
		      var _this = this;
              var ak="1A5rIQWIQZa7ZH8xwpGAHlK3OnM2j1Rg";  // 自己的秘钥
		      MP(_this.ak).then(BMap => {
                          //在此调用api
                          MP(ak);
                 })
     })
  } 
 }
</script>
<style >
    
</style>
-->
<template>
  <div id="app_map">
    <div class="g-wraper">
      <div class="m-part">
        <mapDrag @drag="dragMap" class="mapbox"></mapDrag>
      </div>
    </div>

  </div>
</template>

<script>
import mapDrag from '../subcomponents/position.vue'
export default {
  name: 'app',
  components: {
    mapDrag
  },
  data () {
    return {
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
      }
    }
  },
  methods: {
    dragMap (data) { // 地图拖动时触发的函数
      console.log(data)
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI
      }
    }
  },
  components:{
      mapDrag: mapDrag
  }
}
</script>

<style>
body{ margin: 0; }
.page-header{
  color: #fff; text-align: center; background: #159957;
  background-image: -webkit-linear-gradient(330deg,#155799,#159957);
  background-image: linear-gradient(120deg,#155799,#159957);
  padding: 3rem 4rem; margin-bottom: 30px;
}
.page-header h1{ margin: 0; font-size: 40px; }
.page-header p{ color: #ccc; margin: 0; margin-bottom: 30px; }
.page-header a{ display: inline-block; border: 1px solid #fff; margin-right: 10px; line-height: 40px; padding: 0 20px; border-radius: 4px; color: #fff; text-decoration: none; transition: all .3s; }
.page-header a:hover{ background: #fff; color: #333; }
.g-wraper{ width: 1000px; margin: 0 auto; color: #666; font-size: 16px; line-height: 30px; }
.m-part{ margin-bottom: 30px; }
.m-part::after{ content: ''; display: block; clear: both; }
.m-part .title{ font-size: 30px; line-height: 60px; margin-bottom: 10px; color: #333; }
.m-part .mapbox{ width: 600px; height: 400px; margin-bottom: 20px; float: left; }
.m-part .info{ margin: 0; padding: 0; list-style: none; line-height: 30px; margin-left: 620px; }
.m-part .info span{ display: block; color: #999; }
.m-part ol{ line-height: 40px; margin-left: 0; padding-left: 0; }
.m-part pre{ padding: 10px 20px; line-height: 30px; border-radius: 3px; box-shadow: 0 0 15px rgba(0,0,0,.5); }
.m-footer{ background: #eee; line-height: 60px; text-align: center; color: #999; font-size: 12px; }
.m-footer a{ margin:  0 5px; color: #999; text-decoration: none; }
</style>
