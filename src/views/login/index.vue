 <template>
  <div class="login">
    <div class="customer_header">
      <img src="../../imgs/logo2.png" alt />
      <!-- <h1>乐居生活</h1> -->
    </div>
    <div class="customer_middle">
      <div class="customer_title">
           <h1>登录</h1>
           <el-button @click="backhome">返回首页</el-button>
      </div>
     
      
      <!-- 登录 -->
      <!-- :model 和v-model对应   rules和prop对应 -->
      <el-form :model="userInfo" ref="rulesFrorm" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
            <el-form-item>
                <a class="forgetpsd">忘记密码?</a>
            </el-form-item>
        <el-form-item>
          <button class="loginbtn" @click.prevent="handle('rulesForm')">登 录</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        userName: "",
        password: "",
      },

      rules: {
        userName: [
          { required: true, message: "用户名不能为空" },
          { min: 6, max: 12, message: "长度为6-12字符", trigger: "blur" },
          { pattern: /^\w{6,12}$/, message: "请输入数字字母下划线，长度6-12" },
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 6, max: 12, message: "长度为6-12字符", trigger: "blur" },
          { pattern: /^\w{6,12}$/, message: "请输入数字字母下划线，长度6-12" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["login"]), //给别人
    handle(formName){
        console.log(formName);  
        this.$refs[formName].validate().then((voild)=>{

          if(voild){
             this.login(this.userInfo).then((data)=>{
               if(data.code == "204"){
                 this.$message({message:"登陆成功"})
               }
               this.$router.push("/home")
             }).catch((err)=>{
               this.$message({message:"登录失败"})
               console.log(err);
             })
          }
        })

    },
    backhome(){
      this.$router.push('/home/index')
    }
  },
};
</script>

<style>

.login {
  width: 980px;
  height: 100%;
  margin: 10px auto;
}
.customer_header {
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
  border-bottom:1px solid #ccc
}
.customer_title{
  display: flex;
  justify-content: space-between;
}
.customer_title>button{
  width: 200px;
  height: 50px;
  color: #ccc;
  font-size: 16px;

}
.customer_header img {
  width: 30%;
  height: 100%;
  padding-bottom: 15px;
}
.customer_middle h1{
      margin-bottom: 20px;
}
.customer_middle form{
  width: 485px;
}
.forgetpsd{
  float: right;
  cursor: pointer;
}
.loginbtn{
  cursor: pointer;
  width: 248px;
  height: 45px;
  background-color :#112B46 ;
  color: #fff;
  font-size: 16px;
  border-radius:10px;

}
</style>