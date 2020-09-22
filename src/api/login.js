import {request} from '../utils/request'
export function getProduct(params){
    return request({
        url:"/login",
        mothod:"post",
        params:params
    })
}