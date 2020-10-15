import {request} from '../utils/request'
export function add_collect(params){

   return request({
        url:"/user/add_collect",
        method:"post",
        // params:params,
        data:params
    })
}