<template>
  <div class="home_header">
    <nav class="safe_view">
      <div class="nav_top">
        <div class="nav_top_login">
          <img src="../../imgs/icon_account.png" alt />
          <router-link to="/login">登录</router-link>|
          <router-link to="/register">注册</router-link>
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
export default {
  components: {
    search,
  },
  methods: {
    shopcar() {
      this.$router.push("/home/shopcar");
    },
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
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav_top_login {
  width: 8%;
  color:#fff;
  display: flex;
  justify-content: space-between;
}
.nav_top_login > a {
  color: #ffff;
}
.nav_middle {
  width: 80%;
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
  width: 80%;
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
</style>