import axios from 'axios';
import {
    MessageBox
} from "element-ui"
import {
    getURL
} from './getEnv';
import router from "../router"
import {
    getToken
} from "../assets/auth";
import store from "../store"

export let request = axios.create({
    baseURL: getURL(),
    
})
// 请求拦截器
request.interceptors.request.use(res => {
    console.log(res)
    console.log(getURL());
    if (store.getters.token) {
        console.log( getToken());
        console.log(res);
        res.headers['sessiontoken'] = getToken()
    }
    return res
}, error => {
    console.log(error)
    return Promise.reject(error)
})

request.interceptors.response.use((response) => {
    console.log(response)
    let {
        data
    } = response
    // token失效或验证过期
    if (data.code == "401" || data.code == "402") {
        MessageBox.confirm("是否去登录", "登录失效", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
        }).then(() => {
            router.push("/login")
        }).catch(() => {
            router.push("/home")
        })
    }
    return data //{code:}

}, error => {
    console.log("请求超时", error)
})