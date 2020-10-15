<template>
  <div class="forgetpass">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <div v-if="'1'==active">
      <forgetemail @onactiveone="activety" ref="active1"></forgetemail>
    </div>
    <div v-if="'2' == active">
      <forgetnewpsd :forgetallA="forgetall" @onactivetwo="activety" ref="active2"></forgetnewpsd>
    </div>

    <div style="text-align: right;width:900px">
      <button class="forgetnext" @click="next">下一步</button>
    </div>
  </div>
</template>

<script>
import forgetemail from "./forget_email";
import forgetnewpsd from "./forget_newpsd";

export default {
  data() {
    return {
      active: 1,
      pass: "",
      forgetall: null
    };
  },
  components: {
    forgetemail,
    forgetnewpsd
  },
  methods: {
    next() {
      if (this.active == 1) {
        // 触发子组件请求成功后
        this.$refs.active1.smsnext(); //调用子组件的函数 不是传值
        //异步 请注意 不能直接 使用active函数
      } else if (this.active == 2) {
        this.$refs.active2.forgetpsdnext() //触发forget_newpsd函数 
      }
    },
    activety(e) {
      this.active++;
      this.forgetall = e  //获取forget_email中的onactiveone的参数
    },
  }
};
</script>

<style>
.forgetpass {
  width: 1000px;
  margin: 80px auto;
}
.forgetnext {
  width: 90px;
  height: 40px;
  background-color: #98d1ca;
  border: 1px solid #98d1ca;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.5s;
}
.forgetnext:hover {
  background-color: #fff;
  color: #98d1ca;
  border: 1px solid #98d1ca;
}
</style>