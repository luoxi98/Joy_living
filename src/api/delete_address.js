import {request} from '../utils/request'
export function delete_address(params){
   return request({
        url:"/delete_address",
        method:"post",
        // params:params,
        data:params
    })
}