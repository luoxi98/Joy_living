import {request} from '../utils/request'
export function receipt_indent(params){

   return request({
        url:"/receipt_indent",
        method:"post",
        // params:params,
        data:params
    })
}