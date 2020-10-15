import Vue from 'vue'
import Vuex from 'vuex'
import {login} from "../api/login";
import getters from "./getter";
import createPersistedState from "vuex-persistedstate";
import {getToken,setToken} from "../assets/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:getToken(),//vuex中初始化token
    username:null,
    usercenter:null,
    shopcarquantity:0,

  },
  mutations: {  //修改state里面的东西  数据是由action加工处理
    TOKEN(state,TOKEN){
      state.token = TOKEN;
       setToken(TOKEN)
    },
    USERNAME(state,name){
      console.log(name);
      state.username = name
    },
    USERCENTER(state,usercenter){
      state.usercenter = usercenter
    },
    SHOPCARQUANTITY(state,shopcarquantity){
     state.shopcarquantity = shopcarquantity
    },
    USERINTEGRAL(state,userintegral){
          state.usercenter.integral = userintegral
    },
 
  },
  actions: {
    login({commit},user){
      console.log(user);
      return new Promise((reslove,reject)=>{
        let {userName,password } = user
        console.log(userName,password)
        login({username:userName,password}).then((res)=>{
          commit('TOKEN',res.token)
          commit('USERNAME',userName)
          reslove(res)
        }).catch((err)=>{
          reject(err);
        })
      })
    },
    signout({commit},data){
     commit('TOKEN',data) //TOKEN是函数名TOKEN 传给参二
    },
    usercenter({commit},data){
      
      commit('USERCENTER',data)
    },
    shopcarquantity({commit},data){
      commit('SHOPCARQUANTITY',data)
    },
    // 用户积分
    userintegral({commit},data){
        commit('USERINTEGRAL',data)
    },
  },
 
  getters,
  modules: {
  },
   // plugins 在vuex中使用插件
  // 默认把数据存在localStorage中
  plugins:[createPersistedState({
    storage:window.sessionStorage, //更改默认存储地址：变为sessionSotrage  
    // reducer 作用：自定义存储state中某一个值。默认存储所有的
    reducer(state){
      return{
        // 只储存state中的userInfo
        usercenter:state.usercenter,
        shopcarquantity:state.shopcarquantity
      }
    }
  })
]
})

