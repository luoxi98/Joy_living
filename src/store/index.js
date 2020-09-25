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
    username:null
  },
  mutations: {
    TOKEN(state,TOKEN){
      state.token = TOKEN;
       setToken(TOKEN)
    },
    USERNAME(state,name){
      console.log(name);
      state.username = name
    }
  },
  actions: {
    login({commit},userInfo){
      console.log(userInfo);
      return new Promise((reslove,reject)=>{

        let {userName,password } = userInfo
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
        username:state.username
      }
    }
  })]
})
