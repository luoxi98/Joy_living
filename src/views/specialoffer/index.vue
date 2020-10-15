<template>
  <div class="specialoffer">
    <div class="salecontainer">
      <div class="saletitle">  
             <h1 class="sale">更低价格，更多值得</h1>
          <p class="saleintor" >  &nbsp;在乐居，我们始终相信，降低价格的前提要确保品质不受影响。因此，我们花费了大量时间寻找设计、生产和（平板）包装每件产品的最佳 方法。最终，为每个人都省下一笔钱：宜家的生产成本降低了，提供的价格也更实惠了。象征着宜家品牌以更低成本创造更多价值的持续追求，而消费者也将因此以更低价格获益更多。</p>
      </div>
   
      <div class="tejia">
              <img src="../../imgs/tejia.jpg" alt="">
      </div>
       <div class="saleproduct">
            <div class="saleproductlist" v-for="(item,index) in saleproductlist"  :key="index" @click="salegoods(item)">
              <div class="saleproductlistimg">
                  <img :src="item.img_list[0]" alt="">
              </div> 
                <div class="saleproductlisttitle">
                  <h3>{{item.title}}</h3>
                  <span class="saleproductlisttitle_introduce text-overflow">{{item.introduce}}</span>
                </div>
                <div class="saleproductlistprice">
                    {{item.spike_price}}
                    <div class="original ">{{item.price}} <div class="delete">——</div></div>
                      
                </div>
            </div>
       </div>
    </div>
  </div>
</template>

<script>
import { spike }from "../../api/spike";

export default {
data() {
  return {
    saleproductlist:[]
  }
},
created() {
  spike({type:'special'}).then(res=>{
    this.saleproductlist = res.data;


  })
},
methods: {
  salegoods(item){
      this.$router.push({path:"/home/detail" ,query:{id:item.id}}) 
  }
},
}
</script>

<style>
.sale{
  color: #98D1CA;
  font-weight: normal;
}
.tejia{
  margin-top: 20px;
  width: 100%;
}
.tejia>img{
  width: 100%;
}
.salecontainer{
  width: 80%;
  margin: 20px auto;
}
.saleintor{
  width: 600px;
  margin-top: 20px;
  line-height: 30px;
}
.saleproduct{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.saleproductlist{
  margin-right: 20px;
  margin-top: 30px;
  width: 30%;
  height:450px;
  padding: 10px;
  cursor: pointer;
  /* border: 1px solid #ccc; */
}
.saleproductlistimg{
  width: 100%;
  height: 280px;
}
.saleproductlistimg>img{
  width: 100%;
  height: 100%;
}
.saleproductlisttitle{
  padding-top: 20px;
}
.saleproductlisttitle_introduce{
  font-size: 12px;
  color: #ccc;
}
.text-overflow{
    width: 80%;
    /* 超出内容隐藏 单行打点  */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.saleproductlistprice{
  height: 30px;
  line-height: 30px;
  display: flex;
  margin-top: 20px;
  color: red;
  font-size: 24px;
  font-weight: 600;
}
.saleproductlistprice>.original {
  color: #ccc;
  font-size: 14px;
  position: relative;
  margin-left: 10px;
}
.delete{
  color: #ccc;
  position: absolute;
  font-size: 12px;
  top: 0;
  left: 0;
}
</style>