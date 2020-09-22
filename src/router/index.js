import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
      {path:"*",name:"error",component:()=>import('../views/error')},
      {path:"/login",name:'login',component:()=>import('../views/login')},
      {path:"/register",name:'register',component:()=>import('../views/register')},
      {path:"/",redirect:"/home/index"},
      {path:"/home",name:"home",component:()=>import('../views/home'),children:[
         {path:"index",name:"index",component:()=>import("../views/index/index")},
         {path:"products",name:'products',component:()=>import("../views/products")},
         {path:"specialoffer",name:'specialoffer',component:()=>import("../views/specialoffer")},
         {path:"seckill",name:'seckill',component:()=>import("../views/seckill")},
         {path:"about",name:'about',component:()=>import("../views/about")},
         {path:"shopcar",name:'shopcar',component:()=>import("../views/shopcar")},
      ]},
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
