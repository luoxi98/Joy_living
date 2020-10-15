<template>
  <div class="home_header">
    <nav class="safe_view">
      <div class="nav_top">
        <div class="nav_top_login" @mouseenter="enter" @mouseleave="leave">
          <img src="../../imgs/icon_account.png" alt />
            <div v-if="token">
              <router-link to="/home/personalcenter" style="color:#fff;cursor: pointer;">欢迎{{usercenters.name}}</router-link>
              <div>
                <div class="personal" >
                  <!-- 展开折叠 elementui -->
                <el-collapse-transition>  
                    <div v-show="show3">
                    <div class="transition-box">
                      <router-link tag="li" to="/home/personalcenter/myorder">我的订单</router-link>
                      <router-link tag="li" to="/home/personalcenter/mycoupons">我的优惠券</router-link>
                      <router-link tag="li" to="/home/personalcenter/mycollect">我的收藏</router-link>
                      <router-link tag="li" to="/home/personalcenter/mynews">我的消息</router-link>
                      <router-link tag='li' to="/home/index" @click.native="loginout" class="signout">退出登录</router-link>
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
      <li>
        <product>
          <router-link to="/home/products" tag="li">产品展示</router-link>
      </product>
      </li>
      <router-link to="/home/specialoffer" tag="li">特 价</router-link>
      <router-link to="/home/seckill" tag="li">闪 购</router-link>
      <router-link to="/home/about" tag="li">关于我们</router-link>
      <button @click="shopcar">
        <i class="iconfont icon-gouwuche"></i>
        <div class="cart_count">{{shopcarquantitys}}</div>
      </button>
    </div>
  </div>
</template>
<script>
import search from "../../components/search";
import {mapActions, mapGetters}from"vuex";
import product from "../../components/products"
export default {
  data() {
    return {
     show3: false
    }
  },
  components: {
    search,
    product,
  },
  methods: {
     ...mapActions(['signout','usercenter','shopcarquantity']),//触发vuex中的函数
    shopcar() {
      this.$router.push("/home/shopcar");
    },
    enter(){
      this.show3 = true
    },
    leave(){
      this.show3 = false
    },
      loginout(){
       this.signout(''); //token空
       this.usercenter({});
       this.shopcarquantity(0) // 购物车
       this.show3 = false;
       this.$router.push("/home/index")
       console.log(this.shopcarquantitys);
      }
  },
  computed: {
     ...mapGetters({usercenters:"usercenters",token:"token",shopcarquantitys:"shopcarquantitys"}) //得到 实时获取vuex中变量变化 自动变化
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
  /* width:200px; */
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
  width: 300px;
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
  margin-bottom: 30px;
  padding-bottom: 1px;
}
.nav_bottom>li {
  color: black;
  font-weight: 600;
  height: 100%;
  transition: color border 0.5s;
}
.nav_bottom>li:hover {
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
  position: relative;
  display: flex;
}
.nav_bottom .icon-gouwuche {
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
}
.nav_bottom .icon-gouwuche:hover {
  font-size: 35px;
  font-weight: bold;
}
.personal{
  position:absolute;
  width: 200px;
  top: 36px;
  z-index: 99;
  right: -20px;
 transition: all 0.5s;
  cursor: pointer;
}
 .transition-box {
    width: 180px;
    height: 100%;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 1px rgba(112, 110, 110, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
  }
  .transition-box li{
    line-height: 40px;
    color: #000;
  }
  .signout{
    text-align: center;
    margin-top: 10px;
    border: 1px solid #ccc;
  }
  .cart_count{
    padding: 2px;
    background-color: #97d1c9;
    border-radius: 50%;
    color: #fff;
    position: absolute;
    right: -8px;
    top: -3px;
  }
</style>