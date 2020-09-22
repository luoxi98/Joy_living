import axios from 'axios';
import {MessageBox} from "element-ui"
import {getURL} from './getEnv';
import router from "../router"
import {getToken} from "../assets/auth";
import store from "../store"

export let request = axios.create({
    baseUrl:getURL()
})

// 请求拦截器
request.interceptors.request.use(res=>{
        if(store.getters.token){
            res.header["sessiontoken"] = getToken()
        }
        return res
},error=>{
    console.log(error)
    return Promise.reject(error)
})

request.interceptors.response.use((response)=>{
    let {data} = response
    // token失效或验证过期
    if(data.code=="401" || data.code == "402"){
        MessageBox.confirm("是否去登录","登录失效",{
            confirmButtonText:"确定",
            cancelButtonText:"取消"
        }).then(()=>{
            router.push("/login")
        }).catch(()=>{
            router.push("/home")
        })
    }
},error=>{
    console("请求超时",error)
})