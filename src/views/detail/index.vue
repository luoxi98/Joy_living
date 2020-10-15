<template>
  <div class="detail">
    <div class="container">
      <div class="detail_one">
        <div class="detail_left">
          <div class="bigimg">
            <img :src="imglist[0][borderindex]" alt="" v-show="detail_flag" />
            <img
              :src="
                detailList.parameter == ''
                  ? ''
                  : detail_parameter.content[parameterindex]
              "
              alt=""
              v-show="!detail_flag"
            />
          </div>
          <div class="smallimg">
            <ul>
              <li
                v-for="(item, index) in imglist[0]"
                :key="index"
                @click="changetab(index)"
                :class="{ blue: index == borderindex }"
              >
                <img :src="item" alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div class="detail_right">
          <div class="detail_title">
            <h1>{{ detail_title }}</h1>
            <div class="collect">
              <i
                class="iconfont icon-star"
                @click="collectone"
                v-if="collectflag"
              ></i>
              <i
                class="iconfont icon-wujiaoxing"
                @click="collecttwo"
                v-else
              ></i>
            </div>
          </div>
          <div class="detail_introduce">
            {{ detail_introduce }}
          </div>
          <div class="detail_price">
            价格：￥{{ discount.price ? discount.price : detail_price }}
          </div>
          <div class="describ">
            <div v-if="detailList.parameter == '' ? false : true">
              <div v-if="detail_parameter.title == '颜色'">
                <button
                  class="detailbutton"
                  v-for="(item, index) in detail_parameter.name"
                  :key="index"
                  @click="changetitleone(index)"
                  :class="{ changecolor: index == parameterindex }"
                >
                  {{ item }}
                </button>
              </div>
              <div v-if="detail_parameter.title == '尺寸'">
                <el-button
                  class="detailbutton"
                  v-for="(item, index) in detail_parameter.name"
                  :key="index"
                  @click="changetitletwo(index)"
                  :class="{ changesize: index == parametersizeindex }"
                >
                  {{ item }}
                </el-button>
              </div>
            </div>
          </div>
          <div class="detail_conut">
            数量:
            <div class="detaail_quantity">
              <button @click="countjian" :class="{ jianone: counter == 1 }">
                -
              </button>
              <input type="text" v-model="counter" />
              <button @click="countjia">+</button>
            </div>
          </div>
          <div class="addshopcar" @click="addshopcar">
            <i class="iconfont icon-gouwuche"></i> 加 入 购 物 车
          </div>
          <div class="buy" @click="buy">立 即 购 买</div>
        </div>
      </div>
      <div class="recommond">
        <h1>猜你喜欢</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getProduct } from "../../api/product";
import { addshopcar, allshopcar } from "../../api/shopcar";
import { add_collect } from "../../api/add_collect";
import { delete_collect } from "../../api/delete_collect";
import { all_collect } from "../../api/all_collect";
import { getToken } from "../../assets/auth";
export default {
  data() {
    return {
      imglist: [],
      borderindex: 0, //控制tab切换和大图同步
      detail_title: "",
      detail_introduce: "",
      detail_price: "",
      detail_parameter: {
        content: "",
      },
      detail_flag: true, //控制tab 和颜色尺寸的显示隐藏
      parameterindex: 0, //控制颜色
      parametersizeindex: 0, //控制尺寸
      counter: 1,
      flag: true, //防抖
      shopcarcount: 0,
      detailList: null,
      collectflag: true,
      discount: {
        price: null,
        type: null,
      },
    };
  },
  created() {
    this.detail();
    // 获取全部收藏 判断右上角颜色
    all_collect().then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i] == this.$route.query.id) {
          this.collectflag = false;
        }
      }
    });
  },
  mounted() {
    this.scrolltop();
  },
  methods: {
    ...mapActions(["shopcarquantity"]),
    scrolltop() {
      window.scroll(0, 0);
    },
    collectone() {
      this.collectflag = false;
      add_collect({ product_id: this.$route.query.id }).then((res) => {
        console.log(res);
      });
    },
    collecttwo() {
      this.collectflag = true;
      delete_collect({ product_id: this.$route.query.id }).then((res) => {
        console.log(res);
      });
    },
    detail() {
      getProduct({ id: this.$route.query.id })
        .then((res) => {
          console.log(res.data[0]);
          this.detailList = res.data[0];
          // 图片与处理
          res.data[0].img_list = res.data[0].img_list.split(",");
          for (let a = 0; a < res.data[0].img_list.length; a++) {
            if (res.data[0].img_list[a] == "") {
              res.data[0].img_list.splice(a, 1); //去除空格
            }
          }
          this.imglist.push(res.data[0].img_list);

          this.detail_title = res.data[0].title;
          this.detail_introduce = res.data[0].introduce;
          this.detail_price = res.data[0].price;
          let parameterX = JSON.parse(res.data[0].parameter);
          if (parameterX.length > 0) {
            // console.log(this.detail_parameter,'vcccc')
            this.detail_parameter = JSON.parse(res.data[0].parameter);
          }
          // 判断是否是特价商品
          if (res.data[0].type == "special" || res.data[0].type == "splike") {
            // 判断是否在活动时间
            if(new Date().getTime() > res.data[0].createtime && new Date().getTime() < res.data[0].lostertime ){
              this.discount.price = res.data[0].spike_price
              this.discount.type = res.data[0].type
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changetab(index) {
      this.borderindex = index;
      this.bordercolor = true;
      this.detail_flag = true;
      this.parameterindex = null;
      this.parametersizeindex = null;
    },
    // 切换color
    changetitleone(index) {
      this.parameterindex = index;
      this.detail_flag = false;
      this.borderindex = null;
    },
    // 切换size
    changetitletwo(index) {
      this.parametersizeindex = index;
      this.detail_flag = false;
      this.borderindex = null;
    },
    countjia() {
      this.counter++;
    },
    countjian() {
      this.counter--;
      if (this.counter <= 1) {
        this.counter = 1;
      }
    },

    // 加入购物车
    addshopcar() {
      let hasToken = getToken();
      if (!hasToken || hasToken == "null") {
        this.$confirm("您当前还没登录", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {
            this.$router.push("/login");
            return;
          })
          .catch(() => {
            console.log("取消");
            return;
          });
        return;
      }
      if (this.flag) {
        this.flag = false;
        let shopparamer = {
          id: this.$route.query.id,
          num: this.counter,
          parameter: this.detail_parameter,
          parameter_index: this.parametersizeindex || this.parameterindex,
          price: this.detail_price,
          title: this.detail_title,
        };
        //  没有参数的情况 购物车就不会渲染 因为是根据商品参数来渲染的 没有参数的没法渲染
        if (shopparamer.parameter === null) {
          shopparamer.parameter = {
            name: ["无"],
            content: [this.imglist[0][0]],
          };
        } else {
          shopparamer.parameter = this.detail_parameter;
        }
        addshopcar(shopparamer)
          .then((res) => {
            console.log(res);
            this.$message({ message: "加入购物车成功", type: "success" });
            allshopcar().then((data) => {
              this.shopcarcount = data.data.length;
              this.shopcarquantity(this.shopcarcount); //将数量传给vuex
            });
            this.flag = true;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    buy() {
      var goodsname = [];
      goodsname.push({
        title: this.detail_title,
        img: this.detail_parameter.content[this.parameterindex],
        num: this.counter,
        price: this.detail_price,
      });
      let productid = {};
      productid.goodsid = [this.$route.query.id];
      productid.num = [this.counter];
      if (this.detail_parameter.title == "颜色") {
        productid.parameter = [this.detail_parameter.name[this.parameterindex]];
      } else if (this.detail_parameter.title == "尺寸") {
        productid.parameter = [
          this.detail_parameter.name[this.parametersizeindex],
        ];
      } else {
        productid.parameter = ["无"];
      }

      this.$router.push({
        name: "pay",
        params: {
          productid,
          value: [productid.parameter],
          goodsname,
          total: this.counter * this.detail_price,
        },
      });
    },
  },
};
</script>

<style>
.container {
  width: 80%;
  margin: 0 auto;
  min-width: 600px;
}
.detail_one {
  display: flex;
  justify-content: space-around;
}
.detail_left {
  margin-top: 20px;
  width: 50%;
  height: 600px;
}
.detail_right {
  width: 500px;
  height: 600px;
  margin-right: 60px;
}
.bigimg {
  width: 100%;
  height: 450px;
}
.bigimg > img {
  width: 80%;
  height: 400px;
}
.smallimg > ul {
  width: 100%;
  height: 80px;
  display: flex;
}
.smallimg > ul > li {
  width: 83px;
  height: 82px;
  border: 1px solid #ccc;
  margin-right: 15px;
}
.smallimg img {
  width: 80px;
  height: 100%;
}
.smallimg > ul > .blue {
  width: 86px;
  height: 82px;
  border: 3px solid #98d1ca;
}
.detail_right {
  padding-left: 30px;
}
.detail_title {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.collect {
  font-size: 20px;
}
.collect .icon-wujiaoxing {
  color: #f0cc4e;
}
.collect > i {
  font-size: 22px;
  cursor: pointer;
}
.detail_introduce {
  margin-top: 20px;
  font-size: 14px;
  color: #ccc;
  height: 30px;
  line-height: 30px;
}
.detail_price {
  padding-top: 100px;
  font-size: 30px;
  font-weight: 600;
}
.describ {
  margin-top: 40px;
}
.describ > div {
  display: flex;
  color: #fff;
}
.detailbutton {
  padding: 10px;
  height: 40px;
  font-size: 12px;
  background: #fff;
  border-radius: 5px;
  margin-right: 10px;
  border: 1px solid #98d1ca;
  color: #98d1ca;
  cursor: pointer;
}
.detailbutton:hover {
  color: #fff;
  background-color: #98d1ca;
}
.detailbutton.changecolor {
  color: #fff;
  background-color: #98d1ca;
}
.detailbutton.changesize {
  color: #fff;
  background-color: #98d1ca;
}
.detail_conut {
  margin-top: 30px;
  height: 50px;
  width: 125px;
}
.detaail_quantity {
  border: 1px #dddddd solid;
  border-radius: 5px;
  height: 30px;
  text-align: center;
  margin-top: 10px;
}
.jianone {
  color: #ccc;
}
.detaail_quantity > button {
  text-align: center;
  width: 30px;
  height: 15px;
  font-size: 18px;
  cursor: pointer;
}
.detaail_quantity > input {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.addshopcar {
  width: 250px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  background-color: #98d1ca;
  margin-top: 50px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}
.addshopcar > .icon-gouwuche {
  color: #fff;
}
.buy {
  width: 250px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  margin-top: 20px;
  color: #98d1ca;
  border: 1px solid #98d1ca;
  background-color: rgba(152, 209, 202, 0.1);
}
/* .el-message, .el-message--success{
  color: #98D1CA;
  border: 1px solid #98D1CA;
  background-color: #fff;
}
.el-message,.el-message--success>.el-message__content{
  color:#98D1CA;
  font-size: 14px;
  font-weight: 600;
}
.el-message,.el-message_icon,.el-message--success{
  color:#98D1CA;
} */
</style>