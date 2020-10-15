import {request} from '../utils/request'
export function add_indent(params){

   return request({
        url:"/add_indent",
        method:"post",
        data:params
    })
}