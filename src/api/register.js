import {request} from "../utils/request"
export function register(params){
    return request({
        url:"/register",
        method:"post",
        data:params
    })
}