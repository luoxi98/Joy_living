<template>
  <div class="address">
    <div class="address_title">收货地址</div>
    <div class="addressInformation">
      <div>收货地址</div>
      <div @click="add_addresss">
        <span class="jia">+</span> 添加收货地址
      </div>
    </div>
    <div class="addressform">
      <div v-for="(item, index) in address_list" :key="index" class="address_box">
        <div class="address_name">
          <div>姓名： {{item.recipients}}</div>
          <div>电话{{item.tel}}</div>
        </div>
        <div class="open_flex">
          <div class="open_flex">
            地址：
            <div>{{item.province}}</div>
            <div>{{item.city}}</div>
            <div>{{item.area}}</div>
          </div>
          <button @click="update_address(index)">修改</button>
        </div>
        <div class="open_flex Address">
          <span>{{item.Address}}</span>
          <button @click="delete_address(index)">删除</button>
        </div>
      </div>
    </div>
    <el-dialog title="添加地址" :visible.sync="dialogTableVisible">
      <addressA @onaddress="onaddress"></addressA>
    </el-dialog>
  </div>
</template>

<script>
import { delete_address } from "../../api/delete_address";
import { all_address } from "../../api/all_address";
import addressA from "../../components/address";
import {add_address} from '../../api/add_address'
export default {
  data() {
    return {
      address_list: [],
      dialogTableVisible: false
    };
  },
  components: {
    addressA
  },
  created() {
    all_address().then(res => {
      console.log(res);
      this.address_list = res.data
    });
  },
  methods: {
    delete_address(index) {
      this.$confirm("此操作将删除该收货地址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delete_address({ index }).then(res => {
            console.log(res);
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    update_address(index) {
      console.log(index);
    },
    onaddress(e){
      add_address(e).then(res=>{
        console.log(res)
      })
    },
    add_addresss(){
      this.dialogTableVisible = true

    }
  }
};
</script>

<style>
.open_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.open_flex button {
  background-color: #97d1c9;
  color: #fff;
  width: 60px;
  height: 30px;
  font-size: 14px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
}
.open_flex button:hover {
  color: #97d1c9;
  background-color: #fff;
  border: 1px solid #97d1c9;
}
.address_box {
  background-color: #fff;
  border: 2px solid #97d1c9;
  border-radius: 8px;
  padding: 10px;
  margin: 14px 20px;
}
.address_name {
  display: flex;
  color: #333;
  font-size: 14px;
}
.Address {
  padding-left: 50px;
  font-size: 14px;
}
.address_title {
  font-size: 22px;
  padding: 15px 0;
}
.addressInformation {
  display: flex;
  justify-content: space-between;
  height: 45px;
  line-height: 45px;
  width: 100%;
  background-color: #f8f8f8;
  padding: 0 15px;
}
.jia {
  color: red;
  font-weight: 600;
  font-size: 24px;
}
.addressform {
  width: 800px;
  margin: 20px auto;
}
.next-table-header {
  width: 800px;
}
.next-table-header th {
  padding: 0;
  background: #ebecf0;
  color: #333;
  text-align: left;
  font-weight: 400;
  border: 1px solid #dcdee3;
}
.next-table-cell-wrapper {
  padding: 12px 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>