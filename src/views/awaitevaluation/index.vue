<template>
    <div class="awaitevaluation">
          <div v-if="flag" class="noorder">
                <h1>你还没有此订单</h1>
         </div>
        <div>
               <div class="awaitevaluation" v-for="(item,index) in deliveredlist" :key="index" @click="awaitevaluation(item)">
                    <div class="awaitevaluationimg">
                        <img :src="item.img" alt="">
                    </div>
                    <div class  ="awaitevaluationdetail">
                            <div class="awaitevaluationtitle">
                                    {{item.title}}
                            </div>
                            <div class="awaitevaluationparameter">
                                   {{item.parameter}}
                            </div>
                    </div>
                    <div class="awaitevaluationright">
                        <div class="awaitevaluationprice">
                                价钱: {{item.price}}
                        </div>
                        <div class="awaitevaluationcount">
                               x{{item.num}}
                        </div>
                        <div class="awaitevaluationtotal">
                              总价: <span>{{item.all_price}}</span> 
                        </div>
                    </div>
            </div>

            <div class="awaitshipment_two">
                <button>确 认 收 货</button>
                <button>退 款</button>
            </div>
        </div>
       
    </div>
</template>

<script>
import { unpaid }from "../../api/unpaid";
import { getProduct }from "../../api/product"
export default {
    data() {
        return {
            deliveredlist:[],
            flag:false
           
        }
    },
    methods: {
        awaitevaluation(item){
    
            this.$router.push({path:"/home/detail" ,query:{id:item.goodsid}}) 
        }
    },

 created() {
     unpaid().then(async res=>{
        //  console.log(res);
         let deliveredlist = res.data  //v-for里面数组添加新属性 要一次性添加完 然后赋值给新数组 否则 每次渲染每次添加 视图渲染不了
         console.log(this.deliveredlist);
         for(let i = 0;i<deliveredlist.length;i++){
             try {
                 let result = await getProduct({id:deliveredlist[i].goodsid})
                 console.log(result)
                deliveredlist[i].img =  result.data[0].img_list
                deliveredlist[i].title =  result.data[0].title
                deliveredlist[i].price =  result.data[0].price
                 deliveredlist[i].img =  result.data[0].img_list.split(",")[0]
                 console.log(deliveredlist[i].title);
             } catch (error) {
                 console.log(error)
             }
         }
         this.deliveredlist  = deliveredlist  
         console.log(this.deliveredlist);

     })
 },
}
</script>

<style>
.awaitevaluation{
    margin-top: 20px;
    width: 100%;
}
.awaitevaluation{
    padding: 10px;
    width: 80%;
    display: flex;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;
}
.awaitevaluation>div{
    width: 33.3%;
}
.awaitevaluationimg{
    width: 90%;
    height: 100px;
}
.awaitevaluationimg>img{
    width: 100px;
    height: 100px;
}
.awaitevaluationtitle{
    width: 100%;
    height: 50px;
    line-height: 50px;
}
.awaitevaluationprice{
    width: 100%;
    height: 40px;
    line-height: 40px;
    /* background-color: red; */
    text-align: right;
}
.awaitevaluationcount{
    width: 100%;
    height: 40px;
    line-height: 40px;
      text-align: right;
      color: #ccc;
      font-size: 12px;
}
.awaitevaluationtotal{
    width: 100%;
    height: 40px;
    line-height: 40px;
    /* background-color:green; */
    text-align: right;
    font-size: 14px;
    
}
.awaitevaluationtotal>span{
        color: red;
        font-size: 18px;
}
.awaitshipment_two{
    text-align: right;
    margin-top: 30px;
}
.awaitshipment_two>button{
    height: 35px;
    width:100px;
    line-height:35px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    color: #ccc;
}
</style>