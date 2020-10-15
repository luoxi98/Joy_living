import {request} from '../utils/request'
export function all_integral(){

   return request({
        url:"/user/all_integral",
        method:"get",
    })
}