import {request} from '../utils/request'
export function addshopcar(params){
   return request({
        url:"/user/add_shopcar",
        method:"post",
        // params:params,
        data:params
    })
}
export function allshopcar(){
    return request({
        url:"/user/all_shopcar",
        method:"post",
        
    })
}
export function deleteshopcar(params){
    return request({
        url:"/user/delete_shopcar",
        method:"post",
        data:params
    })
}