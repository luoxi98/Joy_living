<template>
  <div class="pay">
      <div class="containerpay">
          <div class="pay_header">
                <img src="../../imgs/logo2.png" alt="">
          </div>
          <div class="payorder">
                <div class="payorederaddress" @click="payorederaddress">
                     <h3>收货地址</h3>
                     <div>
                        收货人： {{address.recipients}}      
                        联系方式 {{address.tel}}
                     </div>
                     <div>
                        收货地址 {{address.province}}{{address.city}}{{address.area}}{{address.address}}
                     </div>
                </div>
                <!-- 收货地址 -->
                  <el-dialog
                        title="提示"
                        :visible.sync="centerDialogVisible"
                        width="30%"
                        center>
                            <div v-for="(item,index) in alladdress" :key="index"  class="addresslist"  @click="addresslist(item)">
                                  <div>
                                       收货人： {{item.recipients}}
                                        联系方式：{{item.tel}}
                                    </div>
                                    <div>
                                       地址： {{item.province}}{{item.city}}{{item.area}}{{item.address}}
                                    </div>
                            </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="centerDialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                        </span>
                 </el-dialog>
                <div class="payorderproduct">
                    <h3>订单</h3>
                    <div class="payorderproduct_list">
                        <table class="payorderform">
                            <thead>
                                <tr>
                                    <th class="payordertitle">商品</th>
                                    <th>价钱</th>
                                    <th>数量</th>
                                    <th>总价</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in goodsname" :key="index">
                                    <td>
                                        <dl class="payorder_item">
                                            <dt><img :src="item.img" alt=""></dt>
                                               <div class="itemproduct">
                                                     <dd class="itemtitle">{{item.title}}</dd>                                                                                                                         
                                                      <dd class="itemparamrter">{{item.parameter}}</dd>
                                                </div>
                                      </dl> 
                                    </td>
                                    <td>￥{{item.price}}</td>
                                    <td>{{item.num}}</td>
                                    <td>{{item.price*item.num}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="payordertotal">
                        <textarea name="备注" placeholder="备注" v-model="postscript"></textarea>
                        <div class="payordertotal_price">
                               <div class="original_price">原 价：<span>￥{{total}}</span> </div> 
                                 <div class="discounts">优 惠 ：<span v-if="priceflag" style="color:red">-{{couponobj.price}}</span> <span v-else class="available" @click="available">可使用{{discountscount}}张</span></div>
                                <div class="summation">合 计：<span>￥{{finallytotal}}</span> </div> 
                                <button class="submitorder" @click="submitorder">提 交 订 单</button>
                       </div>
                    </div>
                </div>

          </div>
                <!-- 使用优惠券弹框 -->
               <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="40%"
              :before-close="handleClose">
                <div class="demo">
               <div class="stamp stamp01" v-for= "(item,index) in usercoupon" :key="index">
                     <div class="par"><p>乐居商城</p><sub class="sign">￥</sub><span>{{item.price}}</span><sub>优惠券</sub><p>{{item.title}}</p></div>
                    <div class="copy"><button class="Immediatelychange" @click="Immediatelyuse(item)">立即使用</button><p class="noback">一经兑换下单取消不会退回</p></div>
                    <i></i>
                  </div>  
                 </div>
            
          </el-dialog>  
      </div>
  </div>
</template>
<script>
import { all_address } from "../../api/all_address"
import {add_indent} from "../../api/add_indent"
import { pay_indent } from "../../api/pay_indent"
import { all_coupon }from "../../api/all_coupon"
export default {
    data() {
        return {
            address:{},
            alladdress:[],
            postscript:'',
            coupon:null,
            goodsname:[],
            // 订单参数
            gooodid:[],
            num:[],
            parameter:[],
            total:0, //原价
            finallytotal:0,  //最终价钱
            discountscount:0 , //优惠券数量
            usercoupon:[],//用户优惠券
            dialogVisible:false,
            priceflag:false,
            couponobj:{}, //减去的钱数
            centerDialogVisible:false //地址弹框
        }
    },
    created() {
        // console.log(this.usercoupons);
        // // window.location.href("www.baidu.com",'_blank')
        // console.log(this.$route.params,'hhhgjhgjhgjh');
        // console.log(this.$route.params.goodsname);
        all_address().then(res=>{
            this.goodsname = this.$route.params.goodsname
            this.total = this.$route.params.total
            this.finallytotal = this.$route.params.total
            console.log(res);
            if(res.code == 204){
                this.address=res.data[0]
                this.alladdress = res.data
                // console.log(this.address);
            }

        }).catch(err=>{
            console.log(err);
        })
        // 获取用户所有的优惠券
        all_coupon().then(res=>{
            console.log(res.data);
                 for(let i = 0;i<res.data.length;i++){
                // 将时间戳转化为年月日
                res.data[i].losetimer = this.data(res.data[i].losetimer)
                    if(new Date().getTime() >=res.data[i].losetimer){  //过期自动删除
                            res.data.splice(i,1)
                    }
                    if(this.total < parseInt(res.data[i].Preferential)){
                            res.data.splice(i,1)
                    }
                }
            this.discountscount = res.data.length
            this.usercoupon = res.data

        })
    },
    methods: {
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
        // 提交订单
        submitorder(){
             add_indent({goodsid:this.$route.params.productid.goodsid,num:this.$route.params.productid.num, parameter:this.$route.params.productid.parameter, address:this.address,postscript:this.postscript,coupon:this.coupon,all_price:this.total}).then(data=>{
                        console.log(data.data.indent_collection);
                        if(data.code == 204){
                            pay_indent({indent_collection:[data.data.indent_collection]}).then(res=>{
                                if(res.code == "204"){
                                    // window.open('www.baidu.com',"_blank")
                                    console.log(res);
                                    // window.open(`/paysuccess?url=${JSON.stringify(res.data)}`, "_blank");
                                    // this.$router.push({path:"/paysuccess"})

                                     window.location.href = res.data
                                }   
                            })
                        }
                    }).catch(err=>{
                        console.log(err);
                    })   
        },

        available(){
          this.dialogVisible = true
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
      },
    //   使用
    Immediatelyuse(item){
        this.dialogVisible = false
        this.priceflag = true
        console.log(item);
        this.couponobj = item
        console.log( this.couponobj);
        this.finallytotal = this.total - item.price
    },
//    支付地址
   payorederaddress(){
        this.centerDialogVisible = true
    },  
    //选择支付地址 
    addresslist(item){
        for(let i = 0;i<this.alladdress.length;i++){
            if(this.alladdress[i] == item){
                this.address = item
                this.centerDialogVisible = false
            }
        }
    } 
   
   },


}
</script>

<style>
.noback{
    width: 145px;
    color: #fff;
    font-size: 8px;
  }
.pay{
    width: 100%;
    height: 100%;
    background-color:#F5F5F5 ;
}
.containerpay{
    width: 60%;
    margin: 0 auto;
    /* background-color: #fff; */
}
.pay_header{
    background-color: #F5F5F5;
    width: 100%;
}
.pay_header>img{
    width: 300px;
    height: 100px;
}
.payorder{
    width: 100%;
    height: 100%;
}
.payorederaddress{
    background-color: #fff;
    padding: 30px;
    border: 1px solid #ccc;
    cursor: pointer;
}
.payorederaddress>h3{
  color: #98D1CA;
}
.payorderproduct{
    margin-top: 30px;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 30px;
}
.payorderproduct>h3{
    color: #98D1CA;
}
.payorderform{
    /* background-color: pink; */
    width: 100%;
}
.payorderform>thead{
    background-color: #F8F8F8;
    height: 40px;
    line-height: 40px;
}
.payorderform>thead>tr>th{
  font-weight: normal;
}
.payordertitle{
    width: 50%;
    text-align: left;   
}
.payorderform>tbody>tr{
    text-align: center;
    height: 150px;
}
.payorder_item{
    display: flex;
}
.payorder_item>dt>img{
    width: 100px;
    height: 100px;
}
.payordertotal{
   width: 100%;
   display: flex;
   justify-content: space-between
}
.payordertotal>textarea{
    resize: none;
    border: 1px solid #ccc;
    width:400px;
    height: 100px;
}
.payordertotal_price>div{
    margin-top: 10px;
}
.submitorder{
    margin-top: 20px;
    width: 200px;
    height: 50px;
    background-color: red;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
}

.itemtitle{
    margin-left: 15px;
    color: black;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
}
.itemparamrter{
    margin-left: 15px;
    margin-top: 15px;
    color:#ccc;
    font-size:14px;
}
.original_price>span{
    font-size: 18px;
}
.summation>span{
    color: red;
    font-size: 22px;
    font-weight: 800;
}
.available{
    color: red;
    cursor: pointer;
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
.addresslist{
    width: 90%;
    height:100px;
    margin-top: 10px;
    border: 1px solid #ccc;
}
</style>