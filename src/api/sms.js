import {request} from '../utils/request'
export function sms(params){
    return request({
        url:"/sms",
        method:"post",
        data:params
    })
}