import {request} from '../utils/request'
export function exchange(params){
   return request({
        url:"/user/exchange",
        method:"post",
        // params:params,
        data:params
    })
}