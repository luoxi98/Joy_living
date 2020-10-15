<template>
  <div class="forget_email">
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px"  class="demo-dynamic">
      <el-form-item  prop="email" label="邮箱" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}]">
        <el-input v-model="dynamicValidateForm.email" class="forget_input"></el-input>
          <el-button v-show="timeTrue == true" @click="acquire">获取验证码</el-button>
          <el-button v-show="timeTrue == false">{{ time }}秒后重新获取</el-button>
      </el-form-item>
        <el-form-item class="forget_input"  label="验证码">
          <el-input  class="forget_input" placeholder="验证码 *" v-model="dynamicValidateForm.code"></el-input>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {email} from "../../api/email";
import{ sms } from "../../api/sms"
export default {
  data() {
    return {
      dynamicValidateForm: {
        email: "",
        code:""     
      },
        timeTrue:true,
        time:60
    };
  },
  methods: {
      acquire(){
            let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if(reg.test(this.dynamicValidateForm.email)){
                email({email:this.dynamicValidateForm.email, type:"forgetpass"}).then((res)=>{
                    console.log(res)
                })
          }else{
              return
          }
           this.timeTrue = false;
           this.time = 60;
           let setTimeoutS = setInterval(() => {
           this.time--;
          if (this.time <= 0) {
            clearInterval(setTimeoutS);
            this.timeTrue = true;
        }
      }, 1000);
      },
       smsnext(){
            sms({type:"forgetpass",code:this.dynamicValidateForm.code,email:this.dynamicValidateForm.email}).then((res)=>{
                    if(res.code == '204'){
                        this.$emit('onactiveone',{uuid:res.data.uuid,email:this.dynamicValidateForm.email})
                    }
            }).catch((err)=>{
                console.log(err);       
            })
        }
  }
};
</script>

<style>
.forget_email {
  width: 685px;
  margin: 50px auto;
  display: flex;
}
.forget_input{
    width: 400px;
    margin-right: 10px;
}
</style>