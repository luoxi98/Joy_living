import {request} from '../utils/request'
export function select_product(params){

   return request({
        url:"/user/select_product",
        method:"get",
        params:params,
        // data:params
    })
}