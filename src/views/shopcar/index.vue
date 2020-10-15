<template>
  <div class="shopcar">
    <div class="shopempty" v-if="shopcarempty">
          <h1>空 空 如 也，赶 快 购 物 去 吧</h1>
    </div>
    <div class="shopcarcontain" v-esle>
      <h1>购物车</h1>
      <div class="shopcarall">
        <div class="shopcarleft">
          <table class="itemFrom">
            <thead>
              <tr>
                <th class="item_select item_header" v-show="selectchecked">
                  <!-- <em class="btn_checkbox FontBgColor"></em> -->
                  <input
                    type="checkbox"
                    name="select_all"
                    v-model="allcheck"
                    @change="all"
                  />
                </th>
                <th class="item_product item_header">商品</th>
                <th class="item_price item_header">价格</th>
                <th class="item_quantity item_header">数量</th>

                <th class="item_operate item_header">订单参数</th>
                <th class="item_operate item_header">订单汇总</th>
                <th>编辑</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in tableData" :key="index">
                <th class="item_select item_header" v-show="selectchecked">
                  <input
                    type="checkbox"
                    name="select_all"
                    v-model="item.ischecked"
                    @change="select(item)"
                  />
                </th>
                <th class="shopproduct">
                  <span>{{ item.title }}</span>
                  <img
                    :src="item.parameter.content[item.parameter_index]"
                    alt=""
                    width="80px"
                    height="80px"
                  />
                </th>
                <th>￥{{ item.price }}</th>
                <th class="shopcountlist" v-show="edit[index]">
                  <button @click="shopjian(index)">-</button>
                  <input type="text" v-model="item.num" />
                  <button @click="shopjia(index)">+</button>
                </th>
                <th v-show="!edit[index]">
                  <span>{{ item.num }}</span>
                </th>
                <th v-show="edit[index]">
                  <transition>
                    <!-- value绑定每个参数在详情点击的参数   item是一个商品的所有参数 index指的是哪个商品-->
                    <el-select
                      v-model="value[index]"
                      @change="changHandel(item, index)"
                    >
                      <el-option
                        v-for="itemOne in item.parameter.name"
                        :key="itemOne.value"
                        :label="itemOne.label"
                        :value="itemOne"
                      >
                        <!-- :value的值 传递给v-model中的value -->
                      </el-option>
                    </el-select>
                  </transition>
                </th>
                <th v-show="!edit[index]" class="shopparameter">
                  <span>{{ value[index] }}</span>
                </th>
                <th>￥{{ item.num * item.price }}</th>
                <th class="shopedit">
                  <button v-show="!edit[index]" @click="editone(index)">
                    修改
                  </button>
                  <button v-show="edit[index]" @click="edittwo(index)">
                    确定
                  </button>
                </th>
              </tr>
            </tbody>
          </table>

          <form action="">
            <div class="list_information"></div>
          </form>
        </div>
        <div class="shopcarright" v-show="finallyflag">
          <div class="shopcarright_total">结算</div>
          <div class="total_price">
            <div class="total_price_one">总价</div>
            <div class="total_price_two">￥{{ total }}</div>
          </div>
          <div class="finally">
            <div class="finallyone">
              <button class="deteleshopcar" @click="deleleshopcar">
                删 除 购 物 车
              </button>
            </div>

            <div class="finallytwo">
              <button class="finallytotal" @click="finallytotal">结 算</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allshopcar, deleteshopcar } from "../../api/shopcar";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      value: [], //接收每个商品在详情点击的那个参数
      indexItem: null,
      total: 0, //总价钱
      allcheck: false,
      edit: [],
      selectchecked: true,
      productid: {
        //传给订单pay页面
        goodsid: [], //传参goodid
        num: [], //数量
        parameter: [], //参数
      },
      finallyflag: true,
      shopcarempty: false,
    };
  },
  methods: {
    ...mapActions(["shopcarquantity"]),
    // 编辑
    editone(index) {
      this.edit[index] = !this.edit[index];
      this.$set(this.edit, index, this.edit[index]);
      console.log(this.edit);
      this.selectchecked = false;
      this.finallyflag = false;
    },
    // 确定
    edittwo(index) {
      this.edit[index] = !this.edit[index];
      this.$set(this.edit, index, this.edit[index]);
      this.selectchecked = !this.selectchecked;
      for (let k = 0; k < this.tableData.length; k++) {
        this.tableData[k].ischecked = false;
      }
      this.allcheck = false;
      this.total = 0;
      this.finallyflag = true;
    },
    all() {
      this.productid.goodsid = []; //全选id 传参订单
      this.productid.num = []; //全部数量
      this.productid.parameter = []; //全部参数
      this.total = 0; //全选
      for (let a = 0; a < this.tableData.length; a++) {
        this.tableData[a].ischecked = this.allcheck;
        if (this.allcheck == true) {
          this.total += this.tableData[a].price * this.tableData[a].num;
          this.productid.goodsid.push(this.tableData[a].id);
          this.productid.num.push(this.tableData[a].num);
          this.productid.parameter.push(
            this.tableData[a].parameter.name[this.tableData[a].parameter_index]
          );
        }
        console.log(this.productid);
      }
    },
    //单选
    select(item) {
      for (let x = 0; x < this.tableData.length; x++) {
        console.log(this.tableData[x].ischecked, item, x);
        if (this.tableData[x].ischecked) {
          this.allcheck = true;
        } else {
          this.allcheck = false;
          break;
        }
      }
      console.log(this.productid.goodsid);
      let index;
      if (item.ischecked) {
        this.total += item.price * item.num;
        this.productid.goodsid.push(item.id);
        this.productid.num.push(item.num);
        this.productid.parameter.push(
          item.parameter.name[item.parameter_index]
        );
        console.log("选择");
      } else {
        this.total -= item.price * item.num;
        // 删除时 的 删除id
        for (let i = 0; i < this.productid.goodsid.length; i++) {
          if (this.productid.goodsid[i].delete_id == item.delete_id) {
            index = i;
          }
        }
        this.productid.goodsid.splice(index, 1);
        this.productid.num.splice(index, 1);
        this.productid.parameter.splice(index, 1);
      }
      console.log(this.productid);
    },
    shopjian(index) {
      this.tableData[index].num--;
      if (this.tableData[index].num <= 1) {
        this.tableData[index].num = 1;
      }
    },
    shopjia(index) {
      this.tableData[index].num++;
    },
    changHandel(item, index) {
      //  var a =`  ["120x200 厘米",
      //         "90x200 厘米"]`
      //         console.log(a)

      //  this.tableData[index].parameter.name 每一个商品的所有参数
      for (let i = 0; i < this.tableData[index].parameter.name.length; i++) {
        if (this.value[index] == this.tableData[index].parameter.name[i]) {
          this.tableData[index].parameter_index = i;
          //  将tableData[index].parameter_index的值替换成i 返给后台
          console.log(i);
          return;
        }
      }
    },
    deleleshopcar() {
      this.total = 0;
      for (let y = 0; y < this.tableData.length; y++) {
        if (this.tableData[y].ischecked == true) {
          deleteshopcar({ delete_id: this.tableData[y].delete_id })
            .then(({ code }) => {
              if (code == 204) {
                this.tableData.splice(y, 1);
                this.$message("删除成功");
                this.shopcarquantity(this.tableData.length);
              }
            })()
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    // 结算
    finallytotal() {
      var goodsname = [];
      // var a = [{this.title,this.parameter,this.img,this.price,this.num,}]
      // 传到pay页面渲染的参数
      for (let k = 0; k < this.tableData.length; k++) {
        if (this.tableData[k].ischecked) {
          goodsname.push({
            title: this.tableData[k].title,
            parameter: this.value[k],
            img: this.tableData[k].parameter.content[
              this.tableData[k].parameter_index
            ],
            num: this.tableData[k].num,
            price: this.tableData[k].price,
          });
        }
      }
      this.$router.push({
        name: "pay",
        params: {
          productid: this.productid,
          value: this.value,
          goodsname,
          total: this.total,
        }, //传参goodid
      });
    },
  },
  created() {
    allshopcar()
      .then((res) => {
        this.tableData = res.data;
        console.log(this.tableData, "1212121212");
        if (this.tableData == []) {
          this.shopcarempty = true;
        } else {
          for (let i = 0; i < this.tableData.length; i++) {
            //  在value中添加第一个数据(是详情点击的参数)   parameter.name所有参数
            this.tableData[i].ischecked = false;
            this.edit.push(false);
            this.value.push(
              this.tableData[i].parameter.name[
                this.tableData[i].parameter_index
              ]
            );
          }
          console.log(this.tableData);
          this.shopcarquantity(res.data.length);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ...mapGetters(["shopcarquantitys"]),
  },
};
</script>
<style>
.shopcar {
  width: 100%;
  background: #f5f5f5;
}
.shopcarcontain {
  width: 1200px;
  background-color: #fff;
  margin: 0 auto;
}
.shopcarall {
  width: 100%;
  margin-top: 20px;
  border: 2px solid #97d1c9;
  border-radius: 5px;
  display: flex;
}
.shopcarleft {
  width: 70%;
  display: flex;
}
.shopcarright {
  width: 30%;
  border-left: 1px solid #ccc;
  height: 800px;
}
.shopcarright_total {
  height: 70px;
  font-size: 24px;
  line-height: 70px;
  text-align: left;
  width: 80%;
  margin: 0 auto;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
}
.total_price {
  width: 70%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}

.itemFrom > thead > tr > .item_quantity {
  text-align: start;
}

.total_price_one {
  font-size: 16px;
  font-weight: 600;
}
.total_price_two {
  font-size: 24px;
  font-weight: 600;
  color: red;
}
.item_select > input {
  margin-left: 10px;
  margin-top: 25px;
  width: 20px;
  height: 20px;
}
.item_header {
  height: 54px;
  line-height: 54px;
  text-align: left;
  border-bottom: 1px #f0f0f0 solid;
  white-space: nowrap;
}

.itemFrom .item_price {
  width: 98px;
  padding-right: 10px;
}
.itemFrom .item_header {
  height: 54px;
  line-height: 54px;
  text-align: left;
  border-bottom: 1px #f0f0f0 solid;
  white-space: nowrap;
}

.itemFrom .item_quantity {
  text-align: center;
  width: 141px;
  text-indent: 24px;
}
.itemFrom .item_header {
  height: 54px;
  line-height: 54px;
  text-align: left;
  border-bottom: 1px #f0f0f0 solid;
  white-space: nowrap;
}
.itemFrom .item_operate {
  width: 126px;
}
.itemFrom .item_header {
  height: 54px;
  line-height: 54px;
  text-align: center;
  border-bottom: 1px #f0f0f0 solid;
  white-space: nowrap;
}
.shopcountlist {
  height: 30px;
  width: 80px;
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.shopcountlist > button {
  width: 30px;
  font-size: 16px;
  /* background-color: yellow; */
  text-align: center;
  cursor: pointer;
}
.shopcountlist > input {
  font-size: 16px;
  width: 30px;
  text-align: center;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.shopproduct {
  display: flex;
  justify-content: space-around;
  line-height: 80px;
  height: 80px;
  font-weight: normal;
  font-size: 14px;
}
.shopparameter {
  font-size: 14px;
  font-weight: normal;
}
.shopedit > button {
  width: 50px;
  height: 25px;
  color: #97d1c9;
  background-color: #fff;
  border: 1px solid #97d1c9;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}
.shopedit > button:hover {
  background-color: #97d1c9;
  color: #fff;
}
.finally {
  width: 80%;
  margin: 30px auto;
}
.finallyone {
  width: 80%;
  height: 30px;
  margin: 0 auto;
}
.deteleshopcar {
  width: 100%;
  text-align: center;
  height: 40px;
  border-radius: 5px;
  background-color: #97d1c9;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.finallytwo {
  width: 80%;
  height: 30px;
  margin: 30px auto;
}
.finallytotal {
  width: 100%;
  text-align: center;
  height: 40px;
  border-radius: 5px;
  background-color: red;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
}
</style>