<template>
    <div class="forgetnewpsd">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="请输入新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
    </div>
</template>

<style>
.forgetnewpsd{
  margin: 50px auto;
  width: 400px;
}
</style>
<script>
import { forgetpass } from "../../api/forgetpass";
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
          let pattern = /^\w{6,12}/;
          if(pattern.test(value)) {
             callback(); }
           else{
            callback(new Error("请输入6-12位数字字母下划线"));
          }
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    props:['forgetallA'],
    methods: {
      forgetpsdnext(){
        forgetpass({newpass:this.ruleForm.pass,uuid:this.forgetallA.uuid,email:this.forgetallA.email}).then((res)=>{
          console.log(res)
          if(res.code == "505"){
            this.$message({message:"用户uuid不正确"})
          }
          if(res.code == "204"){
           this.$emit("onactivetwo")
           this.$router.push("/login");

          }
        }).catch((err)=>{
          console.log(err);
          
        })
        
      }
    }
  }
</script>