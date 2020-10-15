import {request} from '../utils/request'
export function add_address(params){

   return request({
        url:"/add_address",
        method:"post",
        // params:params,
        data:params
    })
}