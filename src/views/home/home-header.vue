<template>
  <div class="home_header">
    <nav class="safe_view">
      <div class="nav_top">
        <div class="nav_top_login" @mouseenter="enter" @mouseleave="leave">
          <img src="../../imgs/icon_account.png" alt />
            <div v-if="token">
              <a style="color:#fff;cursor: pointer;">欢迎{{username}}</a>
              <div>
                <div class="personal" >
                <el-collapse-transition>
                    <div v-show="show3">
                    <div class="transition-box">
                      <router-link tag="li" to="/home/myorder">我的订单</router-link>
                      <router-link tag="li" to="/home/mycoupons">我的优惠券</router-link>
                      <router-link tag="li" to="/home/mycollect">我的收藏</router-link>
                      <router-link tag="li" to="/home/mynews">我的消息</router-link>
                    </div>
                    </div>
                </el-collapse-transition>
                </div>
            </div>
          </div>
          <div v-else>
                <router-link to="/login" style="color:#fff">登录</router-link>|
                <router-link to="/register" style="color:#fff">注册</router-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="nav_middle">
      <div class="logo">
        <img src="../../imgs/logo.jpg" alt />
      </div>
      <div class="search_top">
        <search></search>
      </div>
    </div>

    <div class="nav_bottom">
      <router-link to="/home/index" tag="li">首 页</router-link>    
      <router-link to="/home/products" tag="li">产品展示</router-link>
      <router-link to="/home/specialoffer" tag="li">特 价</router-link>
      <router-link to="/home/seckill" tag="li">闪 购</router-link>
      <router-link to="/home/about" tag="li">关于我们</router-link>
      <button @click="shopcar">
        <i class="iconfont icon-gouwuche"></i>
      </button>
    </div>
  </div>
</template>
<script>
import search from "../../components/search";
import {mapGetters}from"vuex";
export default {
  data() {
    return {
     show3: true
    }
  },
  components: {
    search,
  },
  methods: {
    shopcar() {
      this.$router.push("/home/shopcar");
    },
    enter(){
      this.show3 = true
    },
    leave(){
      this.show3 = false
    }
  },
  computed: {
     ...mapGetters({username:"username",token:"token"})
  },
};
</script>

<style>
.home_header {
  width: 100%;
  height: 100%;
}
.safe_view {
  width: 100%;
  background-color: #112b46;
  height: 50px;
}
.nav_top {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
 
}
.nav_top_login {
  width:130px;
  color:#fff;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.nav_top_login>div{
  color: #fff;
}
.nav_middle {
  width: 1200px;
  margin: 0 auto;
  height: 160px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo > img {
  width: 120px;
  height: 120px;
}
.nav_bottom {
  width: 1200px;
  height: 40px;
  margin: 0 auto;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 1px;
}
.nav_bottom li {
  color: black;
  font-weight: 600;
  height: 100%;
  transition: color border 0.5s;
}
.nav_bottom li:hover {
  color: #97d1c9;
  border-bottom: 3px solid #97d1c9;
  cursor: pointer;
}
.nav_bottom .router-link-active {
  color: #97d1c9;
  border-bottom: 3px solid #97d1c9;
  cursor: pointer;
}
.router-link-active .xiajiantou1 {
  color: #97d1c9;
}
.nav_bottom button {
  background-color: #fff;
}
.nav_bottom .icon-gouwuche {
  font-size: 35px;
  font-weight: bold;
}
.nav_bottom .icon-gouwuche:hover {
  font-size: 35px;
  font-weight: bold;
}
.personal{
  position:absolute;
  width: 200px;
  height: 400px;
  top: 35px;
  z-index: 99;
  right: -35px;
  cursor: pointer;
}
 .transition-box {
 
    width: 200px;
    height: 100%;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    padding: 40px 20px;
    box-sizing: border-box;
  
  }
</style>