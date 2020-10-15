<template>
  <div class="order">
      <div class="order_title"> 我的订单</div>
      <div class="orderInformation">
         <div class="orderInformation_left">
              订单消息
          </div> 
          <div class="orderInformation_right">
                <router-link to="/home/personalcenter/myorder/allorder">全部订单</router-link>
                <router-link to="/home/personalcenter/myorder/awaitpayment">待付款</router-link>
                <router-link to="/home/personalcenter/myorder/awaitshipments">待发货</router-link>
                <router-link to="/home/personalcenter/myorder/awaitreview">待收货</router-link>
          </div>
      </div>
      
                <router-view></router-view>
                <recommend></recommend>
  </div>
</template>
   
<script>
import recommend from '../../components/recommend'
export default {
  components:{recommend} 

}
</script>

<style>
  .order_title{
    font-size: 22px;
    padding:15px 0;
  }
  .orderInformation{
    display: flex;
    justify-content: space-between;
    height: 45px;
    line-height: 45px;
    width: 100%;
    background-color: #f8f8f8;
    padding:0 15px;
  }
  .orderInformation_right{
    display: flex;
    justify-content: space-between;
  }
  .orderInformation_right a{
    margin-right: 15px;
    font-size: 12px;
  }
</style>