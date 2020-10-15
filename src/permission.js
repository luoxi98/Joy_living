import router from "./router"
import {
    getToken
} from "./assets/auth"
import {
    MessageBox
} from 'element-ui';

// 全局路由导航首位 路由跳转之前都会先走这个
router.beforeEach((to, from, next) => {
    let hasToken = getToken()
    // 全局路由导航守卫
    if (to.meta.auth) {  //需要权限控制的页面
        if (!hasToken || hasToken == "null") {
            MessageBox.confirm("您当前还没登录", '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                console.log('确定')
                next("/login?redict=" + to.path) //告诉上一个页面是啥
            }).catch(() => {
                console.log('取消')
                next("/home/index")
            })
          
        } else {
            next(true)
        }
    } else {
        next()
    }
})