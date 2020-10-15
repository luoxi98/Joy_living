import {request} from '../utils/request'
export function pay_indent(params){

   return request({
        url:"/pay_indent",
        method:"post",
        // params:params,
        data:params
    })
}