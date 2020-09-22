export function getURL(){
    let env = getEnv();
if( env=== 'development'){
    return env = process.env.VUE_APP_BASE_URL
}else if(env=== 'production'){
   return env = process.env.VUE_APP_BASE_URL
}
}
// 返回环境变量信息
export function getEnv(){
    return process.env.NODE_ENV
}