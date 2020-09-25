const TokenKey = 'Admin-Token'  //设置登录token的key
export function getToken(){
    return sessionStorage.getItem(TokenKey)
}

export function setToken(token){
    return sessionStorage.setItem(TokenKey,token)
}

export function removeToken(){
    return sessionStorage.removeItem(TokenKey)
}