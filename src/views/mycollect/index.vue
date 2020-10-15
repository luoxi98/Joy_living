<template>
  <div class="collect">
      <div class="collect_title"> 我的收藏</div>
      <div class="collect_list" v-for="(item,index) in collectlist" :key="index" @mouseenter="collectenter(item,index)" @mouseleave="collectleave(item)">
            <div class="collect_product" @click="collect_product(item)">          
              <div  class="collect_img"> <img :src="item.img_list[0]" alt=""> </div>
              <div class="collect_img_title">
                 <div>{{item.title}}</div>
                 <span>￥{{item.price}}</span>
                </div> 
            </div>
             <div class="cancelcollect"  v-if="item.collectflag" @click="cancelcollect(item,index)">
                     <i class="iconfont icon-wujiaoxing"></i>
                </div>
      </div>
 
  </div>
</template>

<script>
import { all_collect } from "../../api/all_collect";
import { getProduct } from "../../api/product"
import { delete_collect } from "../../api/delete_collect"
export default {
data() {
  return {
      // collectflag:false,
      collectlist:[]      
  }
},
methods: {
  collect_product(item){
    this.$router.push({path:"/home/detail",query:{id:item.id}})
  },
  // 鼠标移入事件
  collectenter(item,index){
    console.log(item,index);
     item.collectflag = true;
  },
  // 点击取消收藏
  cancelcollect(item,index){
    delete_collect({product_id:item.id}).then(res=>{  //取消收藏
       console.log(res);
      this.collectlist.splice(index,1)
      
     })
  },
  // 鼠标移出
  collectleave(item){
  item.collectflag = false
  }
},
created() {
  all_collect().then(res=>{
     console.log(res);
    if(res.code == 204){
      for(let i = 0;i<res.data.length;i++){
           getProduct({id:res.data[i]}).then(success=>{
            success.data[0].img_list = success.data[0].img_list.split(",")
            success.data[0].collectflag = false
            console.log(success);
            this.collectlist.push(success.data[0]);
             })
             console.log(this.collectlist);
      }
    }
  })
},
}
</script>

<style>
.collect{
    widows: 100%;
    display: flex;
}
  .collect_title{
     font-size: 22px;
     padding:15px 0;
  }
  .collect_list{
    width: 150px;
    margin-right: 40px;
    margin-top: 90px;
    height: 170px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }
 .collect_img_title{
   text-align: center;
 }
 .collect_img_title>div{
   font-size: 12px;
 }
 .collect_img_title span{
   margin-top: 10px;
    color:red;
    font-size:14px;
    font-weight: 600;
 }
  .collect_img{
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  .collect_img img{
    width: 100%;
    height: 100%;
  }
  .collect_two{
    font-size: 14px;
    color:#ccc;
    margin-top: 15px;
  }
  .cancelcollect>i{
    width: 100%;
    margin-top: -25px;
    margin-left: 120px;
    height: 20px;
    color: #F0CC4E;
    cursor: pointer;
  }
</style>