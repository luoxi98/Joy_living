import {request} from '../utils/request'
export function email(params){

   return request({
        url:"/email",
        method:"post",
        // params:params,
        data:params
    })
}