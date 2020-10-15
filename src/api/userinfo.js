import {request} from '../utils/request'
export function userinfo(params){
    return request({
        url:"/user/userinfo",
        method:"post",
        data:params
    })
}