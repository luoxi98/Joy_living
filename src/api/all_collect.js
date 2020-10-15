import {request} from '../utils/request'
export function all_collect(params){

   return request({
        url:"/user/all_collect",
        method:"post",
        // params:params,
        data:params
    })
}