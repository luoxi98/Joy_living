import {request} from '../utils/request'
export function all_coupon(){

   return request({
        url:"/user/all_coupon",
        method:"get",
    })
}