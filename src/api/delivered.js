import {request} from '../utils/request'
export function delivered(){
   return request({
        url:"/user/delivered",
        method:"post",
    })
}