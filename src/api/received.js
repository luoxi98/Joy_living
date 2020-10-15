import {request} from '../utils/request'
export function received(params){

   return request({
        url:"/user/received",
        method:"post",
        // params:params,
        data:params
    })
}