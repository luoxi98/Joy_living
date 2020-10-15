import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
      {path:"*",name:"error",component:()=>import('../views/error')},
      {path:"/login",name:'login',component:()=>import('../views/login')},
      {path:"/register",name:'register',component:()=>import('../views/register')},
      {path:"/forgetpsd" ,name:"forgetpsd",component:()=>import('../views/forgetpsd')},
      {path:"/pay",name:"pay",component:()=>import('../views/pay'),
      meta:{
        auth:true,
        detail:"支付"
      }},
      {path:"/paysuccess",name:"paysuccess",comments:()=>import('../views/paysuccess')},
      {path:"/",redirect:"/home/index"},
      {path:"/home",name:"home",component:()=>import('../views/home'),children:[
         {path:"index",name:"index",component:()=>import("../views/index/index")},
         {path:"products",name:'products',component:()=>import("../views/products/index")},
         {path:"specialoffer",name:'specialoffer',component:()=>import("../views/specialoffer")},
         {path:"seckill",name:'seckill',component:()=>import("../views/seckill")},
         {path:"about",name:'about',component:()=>import("../views/about")},
         {path:"search",name:"search",component:()=>import("../views/search")},
         {path:"shopcar",name:'shopcar',component:()=>import("../views/shopcar"),
         meta:{
           auth:true,
           shopcar:"购物车"
         }},
         {path:"detail",name:'detail',component:()=>import("../views/detail"),
        },
         {path:"personalcenter",name:'personalcenter',component:()=>import("../views/personalcenter"),children:[
          {path:"myorder",name:'myorder',component:()=>import("../views/myorder"),children:[
            {path:"awaitpayment",name:"awaitpayment",component:()=>import("../views/awaitpayment")},
            {path:"awaitreview",name:"awaitreview",component:()=>import("../views/awaitreview")},
            {path:"awaitshipments",name:"awaitshipments",component:()=>import("../views/awaitshipments")},
            {path:"allorder",name:"allorder",component:()=>import("../views/allorder")},
            {path:"awaitevaluation",name:"awaitevaluation",component:()=>import("../views/awaitevaluation")},
          ]},
          {path:"mycollect",name:'mycollect',component:()=>import("../views/mycollect")},
          {path:"mycoupons",name:'mycoupons',component:()=>import("../views/mycoupons")},
          {path:"mynews",name:'mynews',component:()=>import("../views/mynews")},
          {path:"myaddress",name:'myaddress',component:()=>import("../views/myaddress")},
          {path:"mysetting",name:'mysetting',component:()=>import("../views/mysetting")},
         ],redirect:"/home/personalcenter/myorder/allorder"},
      ]},
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
