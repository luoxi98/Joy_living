import {request} from '../utils/request'
export function all_system_coupon(){

   return request({
        url:"/all_system_coupon",
        method:"get",
      
    })
}