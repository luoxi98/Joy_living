<template>
 <div class="coupons">
      <div class="coupons_title"> 我的优惠券</div>
      <div>
        积分：{{usercenters.integral}} <button class="exchange" @click="dialogVisibleexchange ">兑换</button>
      </div>
                 <div class="stamp stamp01" v-for= "(item,index) in allcoupon" :key="index">
                    <div class="par"><p>乐居商城</p><sub class="sign">￥</sub><span>{{item.price}}</span><sub>优惠券</sub><p>{{item.title}}</p></div>
                    <div class="copy"><p class="validitytime">有效期截止：{{item.losetimer}}</p><p class="noback">一经兑换下单取消不会退回</p></div>
                    <i></i>
                  </div> 
          <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="45%"
              :before-close="handleClose">
                <div class="demo">
               <div class="stamp stamp01" v-for= "(item,index) in coupon" :key="index">
                    <div class="par"><p>乐居商城</p><sub class="sign">￥</sub><span>{{item.price}}</span><sub>优惠券</sub><p>{{item.title}}</p></div>
                    <div class="copy"><button class="Immediatelychange" @click="Immediatelychange(item._id)">立即兑换</button><p class="validity">有效期：{{item.timer}}天</p><p class="noback">一经兑换下单取消不会退回</p></div>
                    <i></i>
                  </div>  
                 </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
          </el-dialog>     
</div>
</template>
<script>
import{ all_system_coupon } from "../../api/all_system_coupon.js";
import { exchange } from "../../api/exchange.js";
import { mapGetters,mapActions } from "vuex";
import { all_coupon }from "../../api/all_coupon";
import { all_integral }from "../../api/all_integral"
export default {
 data() {
   return {
      dialogVisible: false,
      coupon:[], //兑换显示的优惠券
      allcoupon:[] //用户全部优惠券
   }
 },
 methods: {
   ...mapActions(["userintegral"]),
  //  封装函数 时间戳转化为年月日
   data(timer){
     let date = new Date(Number(timer))
        let Y = date.getFullYear()+ '-';
        let M = (date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-';
        let D = date.getDate()+' ';
        let h = date.getHours()+':';
        let m = date.getMinutes()+":";
        let s = date.getSeconds()
        return Y+M+D+h+m+s
   },
// 封装获取用户优惠券函数
userallcoupon(){
    all_coupon().then(res=>{
    this.allcoupon = res.data
    console.log(this.allcoupon);
    for(let i = 0;i<this.allcoupon.length;i++){
      // 将时间戳转化为年月日
       this.allcoupon[i].losetimer = this.data(this.allcoupon[i].losetimer)
         if(new Date().getTime() >=this.allcoupon[i].losetimer){  //过期自动删除
                this.allcoupon.splice(i,1)
           }
    }
  })
},
dialogVisibleexchange(){
 this.dialogVisible = true
 all_system_coupon().then(res=>{
   this.coupon = res
   console.log(this.coupon);
    for(let i = 0; i<this.coupon.length;i++){
      this.coupon[i].timer =Number(this.coupon[i].timer)/1000/60/60/24
 }
 })
},
// 立即兑换
Immediatelychange(id){
  exchange({_id:id}).then(res=>{
    if(res.code == 204){
      this.$message({message:"兑换成功",type:"success"})
      // 刷新用户全部优惠券
       this.userallcoupon()
      // 刷新积分
       all_integral().then(data=>{
         console.log(data);
         this.userintegral(data.data.integral)
       })
    }else if(res.code == 517){
      this.$message({message:"您的积分不够",type:"warning"})
    }
    console.log(res);
  })
},
  handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            console.log(_);
            done();
          })
          .catch(_ => {
            console.log(_);
          });
      }
 },
computed: {
  // 用于用户积分
  ...mapGetters(["usercenters"])
},
created() {
 this.userallcoupon()
},
}
</script>
<style>
  .coupons_title{
     font-size: 22px;
     padding:15px 0;
     width: 150px;
     margin-top: -50px;
  }
  .exchange{
    width: 50px;
    height: 30px;
    border:1px solid #97D1C9;
    color: #97D1C9;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
  }
  .noback{
    width: 145px;
    color: #fff;
    font-size: 8px;
  }
    .exchange:hover{
      color: #fff;
      background-color: #97D1C9;
    }
.validitytime{
  font-size: 12px;
  width: 190px;
}
  .demo{width:490px; margin: 0 auto;}
.stamp *{padding: 0;margin: 0;list-style:none;font-family:"Microsoft YaHei",'Source Code Pro', Menlo, Consolas, Monaco, monospace;}
.stamp {
width: 500px;
height: 120px;
padding: 0 10px;
margin-bottom: 20px;
position: relative;
overflow: hidden;
border-radius: 5px;
}
.stamp:before {
content: '';
position: absolute;
top:0;
bottom:0;
left:10px;
right:10px;
z-index: -1;
}
.stamp:after {
content: '';
position: absolute;
left: 10px; 
top: 10px; 
right: 10px; 
bottom: 10px;
box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.5);
z-index: -2;
}
.stamp i{
position: absolute;
z-index: 0;
left: -40%;
top: -60px;
height: 190px;
background-color: rgba(255,255,255,.15);
transform: rotate(-30deg);
}
.stamp .par{
float: left;
padding: 15px;
width: 220px;
border-right:2px dashed rgba(255,255,255,.3);
text-align: left;
}
.stamp .par p{color:#fff;font-size: 14px;
    line-height: 10px;}
.stamp .par span{
font-size: 50px;
color:#fff;
margin-right: 5px;
line-height: 65px;
}
.stamp .par .sign{font-size: 34px;}
.stamp .par sub{position: relative;top:-5px;
color:rgba(255,255,255,.8);
}
.stamp .copy{
display: inline-block;
padding:21px 14px;
width:100px;
vertical-align: text-bottom;
font-size: 30px;
color:rgb(255,255,255);
text-align: center;
line-height: initial;
}
.stamp .copy p{margin-top: 10px;}
.stamp01{
background:#97D1C9;
background-size: 15px 15px;
background-position: 9px 3px;
}
.stamp01:before{
background-color:#97D1C9;
}
.copy>.Immediatelychange{
   cursor: pointer;
  margin: 0 auto;
  width: 80px;
  height: 30px;
  margin-left: 10px;
  background-color: #F0CC4E;
  color:#fff ;
  border-radius: 5px;
  z-index: 9999999;
 
}
.validity{
  width: 100px;
  font-size: 12px;
}


</style>