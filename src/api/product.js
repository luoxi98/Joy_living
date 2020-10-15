import {request} from '../utils/request'
export function getProduct(id){
    return request({
        url:"/all_product",
        mothod:"get",
        params:id
    })
}