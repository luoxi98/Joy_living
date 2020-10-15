import {request} from '../utils/request'
export function dateprofile(userinfo){
    return request({
       url:"/user/updateprofile",
       method:"post",
       data:userinfo
    })
}