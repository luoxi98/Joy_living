<template>
  <div class="linkage">
    <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区">
      <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="shi" @change="choseCity" placeholder="市级地区">
      <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="qu" @change="choseBlock" placeholder="区级地区">
      <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <div style="margin:20px 0px;">
      <el-input type="textarea" :rows="3" placeholder="请输入详细地址" v-model="textarea"></el-input>
    </div>
    <div class="open_flex">
      <div class="open_flex user_addresss">
        <el-input v-model="recipient" placeholder="收件人姓名" size="small"></el-input>
        <el-input v-model="tel" placeholder="收件人手机号码" size="small"></el-input>
      </div>
      <el-button type="small" @click="submitaddress">确定</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      mapJson: "https://www.sngblog.cn:7147/map.json",
      province: "",
      sheng: "",
      shi: "",
      shi1: [],
      qu: "",
      qu1: [],
      city: "",
      block: "",
      textarea: "",
      recipient: "",
      tel: ""
    };
  },
  created() {
    this.getCityData();
  },
  methods: {
    getCityData: function() {
      var that = this;
      axios
        .get(this.mapJson)
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            that.province = [];
            that.city = [];
            that.block = [];
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {
                //省
                that.province.push({
                  id: item,
                  value: data[item],
                  children: []
                });
              } else if (item.match(/00$/)) {
                //市
                that.city.push({ id: item, value: data[item], children: [] });
              } else {
                //区
                that.block.push({ id: item, value: data[item] });
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (
                  that.province[index].id.slice(0, 2) ===
                  that.city[index1].id.slice(0, 2)
                ) {
                  that.province[index].children.push(that.city[index1]);
                }
              }
            }
            // 分类区级
            for (var item1 in that.city) {
              for (var item2 in that.block) {
                if (
                  that.block[item2].id.slice(0, 4) ===
                  that.city[item1].id.slice(0, 4)
                ) {
                  that.city[item1].children.push(that.block[item2]);
                }
              }
            }
          }
        })
        .catch(function(error) {
          console.log(typeof +error);
        });
    },
    // 选省
    choseProvince: function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children;
          this.shi = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          this.qu = this.province[index2].children[0].children[0].value;
          this.E = this.qu1[0].id;
        }
      }
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children;
          this.qu = this.city[index3].children[0].value;
          this.E = this.qu1[0].id;
          // console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock: function(e) {
      this.E = e;
      // console.log(this.E)
    },
    submitaddress() {
      let province = null;
      for (let i = 0; i < this.province.length; i++) {
        if (this.sheng == this.province[i].id) {
          province = this.province[i].value;
        }
      }
      this.$emit("onaddress", {
        province,
        city: this.shi,
        area: this.qu,
        address: this.textarea,
        recipients: this.recipient,
        tel: this.tel
      });
      province = null;
      this.shi = null;
      this.qu = null;
      this.textarea = null;
      this.recipient = null;
      this.tel = null;
    }
  }
};
</script>

<style>
.user_addresss {
  width: 460px;
  padding-bottom: 10px;
}
.user_addresss input {
  width: 150px;
}
</style>