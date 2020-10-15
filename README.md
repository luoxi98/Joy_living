# 9-22 
做了导航的路由跳转 
写了 轮播 features product的组件
使用vuex发送请求 获取token 
写了login的页面 做了token的请求拦截器  组内讨论服务端接口 以及任务需求
# 9-22
写了注册页面 发送请求  将登录 注册彻底做好 能请求成功 
学到知识：post请求key值必须为data  get：params
# 9-23
登录成功 将注册 登录隐藏  用户名显示 及下拉个人中心
将导航个人中心页面完成   
学到内容：vuex存值 页面刷新就没了 路由跳转存在 用到createPersistedState插件进行数据持久化

## 9 -27
vuex中的action是实例化函数 要写在methods中 要加this   mapgetters里面数组是字符串  规定
ref可以获取子组件的函数   父组件 ref = aa    this.$refs.aa.smsnext()  //smsnext是子组件的函数
computed一开始会执行一次
添加 / 隐藏翻译源、语种切换、鼠标悬浮取词开关和显示翻译文本开关在这里。不再提示

## 10.7
请求组件内的路由 this.$route 仅仅当前一个
请求全局的 this.$router 获取整个路由对象
@click.stop阻止单击事件继续传播 停止操作下面的代码

## 10.10
v-if v-show绑定数组index会失效 用 this.$set(this.edit,index,this.edit[index])  
                                            需要改的数组           改之后的值

路由传参传的数组或对象 最后都成了object：object 要转成json字符串

10.14
v-if v-for绑定data数组中的指令 一般情况下来说 只能监听数组长度上的变化  数组里面如果是一个对象 而这个对象在某些函数中增删改查时属性值 vue无法监听到v-for渲染的属性，所以视图无法更新
   history.go(0); 刷新页面





