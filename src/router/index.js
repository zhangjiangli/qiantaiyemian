import Vue from 'vue'
import Router from 'vue-router'

//导入账户管理相关页面
import Login from '../components/account/login/Login.vue'

//导入商城相关页面
import Shop from '../components/shop/Shop.vue'
import GoodsList from '../components/shop/goods/List.vue'
import GoodsDetail from '../components/shop/goods/Detail.vue'
import Shopcart from '../components/shop/shopcart/Shopcart.vue'
import OrderSite from '../components/shop/order/Site.vue'
import OrderPay from '../components/shop/order/Pay.vue';
import OrderComplete from '../components/shop/order/Complete.vue';

Vue.use(Router)

//配置子路由 不用加/
let goods=[
  {name:'goodsList',path:'goods/list',component:GoodsList},
  {name:'goodsDetail',path:'goods/detail/:id',component:GoodsDetail}
];
let shopcart=[
  {name:'shopcart',path:'shopcart',component:Shopcart},
]

let order=[
  //选择一些商品下单
  {name:'orderSite',path:'order/site/:ids',component:OrderSite},
  //需要知道订单ID才能付款
  {name:'orderPay',path:'order/pay/:id',component:OrderPay},
  {name:'orderComplate',path:'order/complete',component:OrderComplete}
]
export default new Router({
  routes: [
    //账户管理路由配置
    {name:'login',path:'/login',component:Login},
    //商城路由配置
    {name:'shop',path:'/',component:Shop,children:[...goods,...shopcart,...order]},
  ]
})
