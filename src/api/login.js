import {request} from '../utils/request'
export function login(params){
    return request({
        url:"/login",
        method:"post",    //  post请求 key必须是data
        data:params
    })
}