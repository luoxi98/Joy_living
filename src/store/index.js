import Vue from 'vue'
import Vuex from 'vuex'
import {login} from "../api/login";
import {getters} from "./getter"
import {getToken,setToken} from "../assets/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:getToken(),//vuex中初始化token
  },
  mutations: {
    TOKEN(state,TOKEN){
      state.token = 
      setToken(TOKEN)
    }
  },
  actions: {
    login({commit},userInfo){
      return new Promise((reslove,reject)=>{
        let {username,password } = userInfo
        login({username,password}).then((res)=>{
          let { data } = res;
          commit('TOKEN',data.token)
          reslove(res.data)
        }).catch((err)=>{
          reject(err);
        })
      })
    },
  },
 
  getters,
  modules: {
  }
})
