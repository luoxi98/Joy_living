import {request} from '../utils/request'
export function all_order(){
   return request({
        url:"/user/all_indent",
        method:"post",
    })
}