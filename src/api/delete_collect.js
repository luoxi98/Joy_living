import {request} from '../utils/request'
export function delete_collect(params){
   return request({
        url:"/user/delete_collect",
        method:"post",
        // params:params,
        data:params
    })
}