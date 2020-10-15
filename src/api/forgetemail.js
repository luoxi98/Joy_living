import {request} from '../utils/request'
export function forgetemail(params){
    return request({
        url:"/user/forgetemail",
        method:"post",    //  post请求 key必须是data
        data:params
    })
}