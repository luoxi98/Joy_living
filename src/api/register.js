import {request} from "../utils/request"
export function register(params){
    return request({
        url:"/user/register",
        method:"post",
        data:params
    })
}