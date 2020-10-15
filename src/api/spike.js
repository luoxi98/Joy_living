import {request} from '../utils/request'
export function spike(params){

   return request({
        url:"/spike",
        method:"get",
        params:params,
        // data:params
    })
}