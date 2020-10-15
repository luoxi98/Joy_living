import {request} from '../utils/request'
export function login(params){
    return request({
        url:"/user/login",
        method:"post",    //  post请求 key必须是data
        data:params
    })
}
export function userInfo(params){
    return request({
        url:"/user/userinfo",
        method:"post",    //  post请求 key必须是data
        // headers: {
        //     'sessiontoken':params
        // }
        data:params
    })
}