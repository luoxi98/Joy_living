<template>
  <div class="register">
    <div class="register_header">
      <img src="../../imgs/logo2.png" alt />
    </div>
    <div class="register_middle">
      <div class="register_title">
        <h1>注册</h1>
        <el-button @click="backlogin">已有账号，去登录</el-button>
      </div>
      <el-form class="register_from" :model="userInfo" ref="rulesForm" :rules="rules">
        <el-form-item prop="userName">
          <el-input class="register_from_input" v-model="userInfo.userName" placeholder="用户名 *"></el-input>
        </el-form-item>
        <el-form-item prop="email" class="registeremail">
          <el-input class="register_from_input" v-model="userInfo.email" placeholder="邮箱 *"></el-input>

          <el-button v-show="timeTrue == true" @click="acquire">获取验证码</el-button>
          <el-button v-show="timeTrue == false">{{ time }}秒后重新获取</el-button>
        </el-form-item>
        <el-form-item class="register_code">
          <el-input class="register_from_input" placeholder="验证码 *" v-model="userInfo.code"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="register_from_input" placeholder="密码 *" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item prop="checkpassword">
          <el-input
            class="register_from_input"
            placeholder="确认密码 *"
            v-model="userInfo.checkpassword"
          ></el-input>
        </el-form-item>
        <el-form-item class="register_bottom">
          <button class="registerbtn" @click.prevent="register('rulesForm')">注册</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from "../../api/register";
import { email } from "../../api/email";
export default {
  name: "register",
  data() {
    //   自定义验证
    // 默认用户输入内容触发
    let vaildataUserName = (rule, value, callback) => {
      console.log(rule);
      console.log(value);
      console.log(callback);
      if (value.trim() === "") {
        callback(new Error("请输入用户名"));
      } else {
        let pattern = /^\w{2,8}$/;
        if (pattern.test(value)) {
          callback();
        } else {
          callback(new Error("请输入2-8位字符;"));
        }
      }
    };
    let vaildataPasword = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入密码"));
      } else {
        let pattern = /^\w{6,12}/;
        if (pattern.test(value)) {
          callback();
        } else {
          callback(new Error("请输入6-12位数字字母下划线"));
        }
      }
    };
    let vaildatacheckpassword = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请再输入密码"));
      } else {
        if (value !== this.userInfo.password) {
          callback(new Error("两次密码输入不一致"));
        } else {
          callback(); //通过
        }
      }
    };

    return {
      userInfo: {
        userName: "",
        email: "",
        password: "",
        checkpassword: "",
        code: "",
      },
      rules: {
        userName: [
          { required: true, validator: vaildataUserName, trigger: "blur" },
        ],
        password: [
          { required: true, validator: vaildataPasword, trigger: "blur" },
        ],
        checkpassword: [
          { required: true, validator: vaildatacheckpassword, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
      },
      timeTrue: true,
      time: 0,
    };
  },
  methods: {
    backlogin() {
      this.$router.push("/login");
    },
    requestRegister() {
      register({
        username: this.userInfo.userName,
        password: this.userInfo.password,
        email: this.userInfo.email,
        code: this.userInfo.code,
      }).then((res) => {
        console.log(res);  //写不写res.data.code 取决于请求拦截器
        if (res.code == "204") {
          this.$message(
            {
              message: "注册成功",
              type: "success",
            },
            this.$router.push("/login")
          );
        } else if (res.code == "517") {
          this.$message({
            message: "用户已存在",
            type: "danger",
          });
          console.log("用户已存在", this.code);
        } else if (res.code == "505") {
          this.$message({
            message: "邮箱验证错误",
            type: "danger",
          });
          console.log("邮箱验证错误", this.code);
        } else if (res.code == "591") {
          this.$message({
            message: "邮箱验证码过期",
            type: "danger",
          });
          console.log("邮箱验证码过期");
        }
      }).catch((err)=>{
          console.log(err)
      })
    },

    register(formName) {
      this.$refs[formName].validate().then((voild) => {
        if (voild) {
            this.requestRegister()
        }
      }).catch((err)=>{
          console.log(err)
          this.$message({
              message:"您输入的内容不合法"
          })
      })
    },
    //验证验证码
    acquire() {
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(this.userInfo.email)) {
        email({ email: this.userInfo.email,type:'register' });
      } else {
        return;
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
  },
};
</script>

<style>
.register_from_input {
  width: 485px;
}
.register {
  width: 980px;
  height: 100%;
  margin: 10px auto;
}
.register_header {
  width: 100%;
  height: 90px;

  margin-bottom: 60px;
  border-bottom: 1px solid #ccc;
}
.register_header img {
  width: 30%;
  height: 100%;
  padding-bottom: 15px;
}

.register_title {
  display: flex;
  justify-content: space-between;
}
.register_title > button {
  width: 200px;
  height: 50px;
  color: #ccc;
  font-size: 16px;
}
.register_header img {
  width: 30%;
  height: 100%;
  padding-bottom: 15px;
}
.registeremail {
  width: 100%;
}
.registeremail_one {
  width: 300px;
}
.register_middle h1 {
  margin-bottom: 20px;
}
.register_middle form {
  width: 650px;
}
.registerbtn {
  cursor: pointer;
  width: 248px;
  height: 45px;
  background-color: #112b46;
  color: #fff;
  font-size: 16px;
  border-radius: 10px;
}
</style>