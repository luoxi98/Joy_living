<template>
  <div class="personal_nav">
      <p class="personal_nav_title">个人中心</p>
      <router-link tag="li" to="/home/personalcenter/myorder"> &nbsp; 我的订单 </router-link>
      <router-link tag="li" to="/home/personalcenter/mycollect"> &emsp; 我的收藏</router-link>
      <router-link tag="li" to="/home/personalcenter/mycoupons"> &emsp; 我的优惠券</router-link>
      <router-link tag="li" to="/home/personalcenter/mynews">  &emsp;我的消息</router-link>
      <router-link tag = "li" to="/home/personalcenter/myaddress">收货地址</router-link>
      <router-link tag="li" to="mysetting"> &emsp; 账户设置</router-link>
  </div>
</template>

<script>
export default {
    name:"personal_nav"
}
</script>
<style>
.personal_nav{
    width: 235px;
    height: 450px;
    background: #f8f8f8;
    border: 1px solid #f8f8f8;
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 40px;
}
.personal_nav_title{
    font-size: 26px;
}
.personal_nav li{
    height: 40px;
    line-height:40px;
    margin-top: 20px;
    cursor: pointer;
    color: #888;
    font-size: 16px;
    padding-left: 20px;
    }
    .personal_nav li:hover{
        background-color: #EFEFEF;
    }
    .personal_nav .router-link-active{
        background-color: #EFEFEF;
    }
</style>