import {request} from '../utils/request'
export function select_pay(params){

   return request({
        url:"/select_pay",
        method:"post",
        // params:params,
        data:params
    })
}