import {request} from '../utils/request'
export function gettypeone(type_one){
    return request({
       url:"type_one",
       method:"get",
       params:type_one
    })
}