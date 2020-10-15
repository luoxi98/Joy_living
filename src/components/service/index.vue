<template>
  <div class="service">
    <div class="service_container" v-if="close">
      <div class="service_top">
        <div style="color: #fff">客服对话</div>
        <button class="serviceclose" @click="serviceclose">关闭</button>
      </div>
      <!-- 聊天记录 -->
      <div class="service_box" ref="service_box">
        <ul style="width: 100%">
          <li
            :class="{
              sercive_message: true,
              sercive_server: item.type == 'server',
              service_user: item.type == 'user',
            }"
            v-for="(item, index) in chatlist"
            :key="index"
          >
            <div class="user_item_message" v-if=" item.type == 'server'">
               <div class="user_poto"><img :src="item.headpoto" alt="" /></div>
                <div class="secive_message_pao">{{ item.content }}</div>
            </div>
            <div></div>
            <div class="user_item_message" v-if="item.type == 'user'">
              <div class="secive_message_pao">{{ item.content }}</div>
              <div class="user_poto"><img :src="item.headpoto" alt="" /></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="inputbox">
        <div style="width: 299px">
          <el-input type="textarea" :rows="3" v-model="inputbox"> </el-input>
        </div>
        <button class="send" @click.enter="send">发送</button>
      </div>
    </div>
    <div class="consult" @click="consult" v-else>咨询客服</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      close: true,
      inputbox: "",
      chatlist: [],
    };
  },
  created() {
    this.sockets.subscribe(this.usercenters.username, (data) => {
      this.chatlist.push(data);
    });
    let user_obj = {
      username: this.usercenters.username,
      timer: new Date().getTime(),
    };
    this.$socket.emit("user_login", user_obj);
  },
  // 连接当前服务器
  sockets: {
    news(data) {
      console.log(data);
    },
  },
  methods: {
    serviceclose() {
      this.close = false;
    },
    consult() {
      this.close = true;
    },
    send() {
      console.log(this.usercenters);

      console.dir(this.$refs.service_box);
      if (this.inputbox == "") {
        this.$message("请输入内容");
        return;
      }
      let char = {
        type: "user",
        username: this.usercenters.username,
        content: this.inputbox,
        timer: new Date().getTime(),
        headpoto: this.usercenters.headpoto,
      };
      this.chatlist.push(char); //添加聊天记录
      // this.$socket.emit 触发服务端的函数 user_send 服务端名字 char 聊天记录
      this.$socket.emit("user_send", char);
      this.inputbox = "";
      this.$refs.service_box.scrollTop =
        this.$refs.service_box.clientHeight + 265;
    },
  },
  computed: {
    ...mapGetters(["usercenters"]),
  },
};
</script>

<style>
.user_item_message {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user_poto {
  margin: 0 8px;
}
.user_poto > img {
  height: 30px;
  width: 30px;
}
.service_box {
  height: 265px;
  overflow: scroll;
  overflow-x: hidden;
}
.sercive_message {
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 14px;
  color: #ccc;
  margin: 6px 0px;
}
.secive_message_pao {
  padding: 6px;
  border-radius: 8px;
  background-color: skyblue;
}
.sercive_server {
}
.service_user {
  justify-content: space-between;
}
.send {
  width: 50px;
  height: 25px;
  background-color: #98d1ca;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  right: 5px;
  bottom: 2px;
}
.service > .service_container {
  width: 300px;
  height: 400px;
  border: 1px solid #98d1ca;
  border-radius: 5px;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  right: 0;
  z-index: 9999999999;
  overflow: hidden;
}
.service_top {
  height: 30px;
  width: 100%;
  background-color: #98d1ca;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #98d1ca;
  border-radius: 5px;
  padding: 0 14px;
}
.serviceclose {
  margin-right: 10px;
  line-height: 30px;
  cursor: pointer;
}
.consult {
  width: 80px;
  height: 80px;
  position: fixed;
  bottom: 30px;
  right: 0;
  z-index: 9999999999;
  overflow: hidden;
  background-color: rgba(152, 209, 202, 0.8);
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
  line-height: 80px;
  text-align: center;
}
.inputbox {
  width: 100%;
  height: 120px;
  bottom: -15px;
  position: fixed;
  border-top: 1px solid #98d1ca;
}
.inputbox > input > .el-input__inner:hover {
  border: 0;
}
</style>