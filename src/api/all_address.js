import {request} from '../utils/request'
export function all_address(params){
   return request({
        url:"/all_address",
        method:"post",
        // params:params,
        data:params
    })
}