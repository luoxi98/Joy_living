import {request} from '../utils/request'
export function refund_indent(params){
    return request({
        url:"/refund_indent",
        method:"post",
        data:params
    })
}