<template>
  <div class="setting">
    <div class="setting_title">个人资料</div>
    <div>
      <el-upload
        class="avatar-uploader"
        action="https://www.sngblog.cn:7147/api/file"
        :show-file-list="false"
        :auto-upload="true"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="usercenters.headpoto"
          :src="usercenters.headpoto"
          class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="user_centers_font">
        <div>
          <span>邮箱：</span>
          <span>{{ usercenter.email }} &nbsp;&nbsp; </span>
          <el-button type="mini" @click="setemail">修改</el-button>
          <el-dialog
            title="修改邮箱"
            :visible.sync="emailupdate"
            width="26%"
            :before-close="handleClose"
          >
            <div>
              <div style="padding-bottom: 14px">
                新邮箱：<el-input
                  style="width: 50%"
                  v-model="newemail.newemail"
                ></el-input>
                <el-button @click="fasongemail">发送验证码</el-button>
              </div>
              验证码：<el-input
                style="width: 60%"
                v-model="newemail.code"
              ></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="emailupdate = false">取 消</el-button>

              <el-button type="primary" @click="Getemail">{{
                information.ischecked ? "确 定" : information.ischecked
              }}</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <span>密码：</span>
          <span>************ </span>
          <el-button type="mini" @click="newpassup">修改</el-button>
          <el-dialog
            title="修改密码"
            :visible.sync="dialogVisible"
            width="26%"
            :before-close="handleClose"
          >
            <div>
              旧密码：<el-input v-model="password.password"></el-input>
              新密码：<el-input v-model="password.newpass"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="Getpass">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div>
          <span>昵称：</span>
          <el-input style="width: 170px" v-model="usercenter.name"> </el-input>
        </div>
        <div>
          <span>性别：</span>
          <el-select
            v-model="usercenter.gender"
            placeholder="请选择"
            @click="user_gender"
            style="width: 70px"
          >
            <el-option label="男" value="男"> </el-option>
            <el-option label="女" value="女"> </el-option>
          </el-select>
        </div>
        <div>
          <span>我的生日：</span>
          <span>{{ usercenter.datebirth }}</span>
          <div class="block">
            <el-date-picker
              @change="datebirth"
              v-model="usercenter.datebirth"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </div>
        <div>
          <span>个人介绍：</span>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="介绍空空如也，快来写一点吧~~"
            v-model="usercenter.synopsis"
          >
          </el-input>
        </div>
      </div>
    </div>
    <div class="setting_save_box">
      <div></div>
      <el-button class="setting_save" @click="settingsave">保存</el-button>
    </div>
  </div>
</template>

<script>
// import { userinfo } from "../../api/userinfo";
import { mapGetters } from "vuex";
import { dateprofile } from "../../api/updateprouserinfo.js";
import { forgetpass } from "../../api/forgetpass.js";
import { forgetemail } from "../../api/forgetemail.js";
import { email } from "../../api/email.js";

export default {
  created() {
    this.usercenter = this.usercenters;
    console.log(this.usercenter);
  },
  data() {
    return {
      usercenter: {},
      dialogVisible: false,
      password: {
        newpass: "",
        password: "",
      },
      newemail: {
        newemail: "",
        type: "upemail",
        code: "",
      },
      information: {
        ischecked: true,
        timer: 60,
      },
      emailupdate: false,
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.usercenter.headpoto = res.img_Url;
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type;
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(isJPG == "image/png");
      if (
        !(isJPG == "image/png" || isJPG == "image/jpg" || isJPG == "image/jpeg")
      ) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    settingsave() {
      console.log(this.usercenter);
      let config = {};
      config.name = this.usercenter.name;
      config.datebirth = this.usercenter.datebirth;
      config.gender = this.usercenter.gender;
      config.synopsis = this.usercenter.synopsis;
      config.headpoto = this.usercenter.headpoto;
      dateprofile(config).then((res) => {
        console.log(res);
      });
    },
    user_gender() {
      // this.$set(this.usercenter, this.usercenter.gender, value);
    },
    datebirth(value) {
      let date = new Date(value).getTime();
      console.log(date);
    },
    newpassup() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    Getpass() {
      this.dialogVisible = false;
      forgetpass(this.password).then((res) => {
        console.log(res);
      });
    },
    Getemail() {
      if (this.information.ischecked) {
        this.information.ischecked = false;
        setInterval(() => {
          this.information.timer--;
          if (this.information.timer <= 0) {
            this.information.timer = 60;
            this.information.ischecked = true;
            clearInterval();
          }
        }, 1000);
        this.emailupdate = false;
        forgetemail(this.newemail).then((res) => {
          console.log(res);
        });
      }
    },
    setemail() {
      this.emailupdate = true;
    },
    fasongemail() {
      email({
        email: this.usercenter.email,
        type: "upemail",
      }).then((res) => {
        console.log(res);
      });
    },
  },
  computed: {
    ...mapGetters({ usercenters: "usercenters" }),
  },
};
</script>
<style>
.setting_title {
  font-size: 22px;
  padding: 15px 0;
}
/* 用户头像 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.setting_save {
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
.setting_save:hover {
  background-color: #fff;
  color: #98d1ca;
  border: 1px solid #98d1ca;
}
.setting_save_box {
  display: flex;
  justify-content: space-between;
  width: 500px;
}
.user_centers_font {
  font-size: 14px;
  font-weight: 400;
  color: #ccc;
  width: 500px;
}
.user_centers_font > div {
  padding: 14px;
}
</style>