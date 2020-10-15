<template>
  <div class="awaitshipments">
      <div v-if="flag" class="flag">
          <h1>你还没有此订单消息哦~</h1>
    </div>

    <div
      class="awaitshipment_one"
      v-for="(item, index) in deliveredlist"
      :key="index"
      @click="awaitshipment_one(item)"
    >
      <div class="indent_code">订单号：{{ item[0].indent_collection }}</div>
      <div v-for="(items, indexs) in item" :key="indexs">
        <div class="indent_item_box">
          <div class="Product_indent_item">
            <div class="awaitshipment_oneimg">
              <img :src="items.img" alt="" />
            </div>
            <div class="awaitshipment_onedetail">
              <div class="awaitshipment_onetitle">
                {{ items.title }}
              </div>
              <div class="awaitshipment_oneparameter">
                {{ items.parameter }}
              </div>
            </div>
          </div>
          <div class="awaitshipment_oneright">
            <div class="awaitshipment_oneprice">价钱: {{ items.price }}</div>
            <div class="awaitshipment_onecount">x{{ items.num }}</div>
          </div>
        </div>
        <div class="item_all_price">
          商品总价：<span>￥{{ items.price * items.num }}</span>
        </div>
      </div>

      <div class="indent_item_footer">
        <el-button>取消订单</el-button>
        <el-button type="danger" @click="payindent(item[0])">去付款</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { unpaid } from "../../api/unpaid";
import { getProduct } from "../../api/product";
import { refund_indent } from "../../api/refund_indent";
// import  {add_indent} from '../../api/all_indent'
import { pay_indent } from "../../api/pay_indent"

export default {
  data() {
    return {
      deliveredlist: [], //[[{},{},{}],[{}],[{}]]
      flag:false
    };
  },
  methods: {
    awaitshipment_one(item) {
      console.log(item);
      // this.$router.push({path:"/home/detail" ,query:{id:item.goodsid}})
    },
    handleClose(item) {
      this.$confirm("确认取消订单吗？")
        .then(() => {
          console.log(item);
          refund_indent({ detailid: item[0].detailid }).then((res) => {
            if (res.code == 204) {
              this.$message("退款成功");
              history.go(0);
            }
          });
        })
        .catch(() => {});
    },
    payindent(item){
        pay_indent({indent_collection:[item.indent_collection]}).then(res=>{console.log(res)
            window.open(res.data)
        })
    },
  },

  created() {
    unpaid().then(async (res) => {
      //  console.log(res);
      let deliveredlist = res.data; //v-for里面数组添加新属性 要一次性添加完 然后赋值给新数组 否则 每次渲染每次添加 视图渲染不了
      console.log(res.data);
      for (let i = 0; i < deliveredlist.length; i++) {
        try {
          let result = await getProduct({ id: deliveredlist[i].goodsid });
          deliveredlist[i].title = result.data[0].title;
          deliveredlist[i].price = result.data[0].price;
          deliveredlist[i].img = result.data[0].img_list.split(",")[0];
        } catch (error) {
          console.log(error);
        }
      }
      //deliveredlist== [{},{},{},{},{}]

      let result = []; // 第二层的数组 用于区分多个订单
      console.log(deliveredlist.length);
      for (let i = 0; i < deliveredlist.length; i++) {
        if (deliveredlist.length == 1) {
          this.deliveredlist.push([deliveredlist[0]]);
          break;
        }
        if (deliveredlist[i + 1]) {
          if (
            deliveredlist[i].indent_collection ==
            deliveredlist[i + 1].indent_collection
          ) {
            result.push(deliveredlist[i]); //if 三个一样 加了前两个
          } else {
            result.push(deliveredlist[i]); //加第三个
            this.deliveredlist.push(result);
            result = [];
            //   continue;
          }
        } else {
          if (
            !(
              deliveredlist[deliveredlist.length - 1].indent_collection ==
              deliveredlist[deliveredlist.length - 2].indent_collection
            )
          ) {
            result.push(deliveredlist[deliveredlist.length - 1]);
          }
          this.deliveredlist.push(result);
        }
      }
      //   this.deliveredlist = deliveredlist;
      console.log(this.deliveredlist);
       if(this.deliveredlist.length <=0){
        this.flag = true
      }
    });
  },
};
</script>

<style>
.flag>h1{
    color: #ccc;
    height: 50px;
    margin-left: 30px;
}
.indent_item_footer {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  text-align: right;
}
.item_all_price > span {
  color: red;
}
.item_all_price {
  text-align: right;
  font-weight: 900;
  font-size: 20px;
  padding-bottom: 6px;
}
.awaitshipment_onedetail {
  margin-left: 30px;
}
.indent_item_box {
  display: flex;
  justify-content: space-between;
}
.Product_indent_item {
  display: flex;
}
.indent_code {
  border-bottom: 1px solid #ccc;
  padding-bottom: 3px;
}
.awaitshipments {
  margin-top: 20px;
  width: 100%;
}
.awaitshipment_one {
  margin: 0 auto;
  padding: 10px;
  width: 80%;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.awaitshipment_oneimg {
}
.awaitshipment_oneimg > img {
  width: 100px;
  height: 100px;
}
.awaitshipment_onetitle {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.awaitshipment_oneprice {
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* background-color: red; */
  text-align: right;
}
.awaitshipment_onecount {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: right;
  color: #ccc;
  font-size: 12px;
}
.awaitshipment_onetotal {
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* background-color:green; */
  text-align: right;
  font-size: 14px;
}
.awaitshipment_onetotal > span {
  color: red;
  font-size: 18px;
}
.awaitshipment_two {
  text-align: right;
  margin-top: 30px;
}
.awaitshipment_two > button {
  height: 35px;
  width: 100px;
  line-height: 35px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  color: #ccc;
}
</style>