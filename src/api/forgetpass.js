import {request} from '../utils/request'
export function forgetpass(params){
    return request({
        url:"/user/forgetpass",
        method:"post",    //  post请求 key必须是data
        data:params
    })
}