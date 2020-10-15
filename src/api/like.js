import {request} from '../utils/request'
export function like (){
    return request({
        url:"/like",
        method:"get",    //  post请求 key必须是data
    })
}