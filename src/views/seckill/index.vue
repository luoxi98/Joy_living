<template>
  <div class="seckill">
    <div class="seckillcontainer">
      <div class="seckilltitle">
        <h1 class="seckill">限 时 抢 好 货</h1>
      </div>
      <div class="miaosha">
        <div class="miaoshatime">
                    <h1>今日秒杀时间：{{ createtime }} - {{ lostertime }}</h1>
                    <h3>{{ seckillproducttime }}</h3>
        </div>
  
      </div>
      <div class="seckillproduct">
        <div
          class="seckillproductlist"
          v-for="(item, index) in seckillproductlist"
          :key="index"
          @click="seckillgoods(item)"
        >
          <div class="seckillproductlistimg">
            <img :src="item.img_list[0]" alt="" />
          </div>
          <div class="seckillproductlisttitle">
            <h3>{{ item.title }}</h3>
            <span class="seckillproductlisttitle_introduce text-overflow">{{
              item.introduce
            }}</span>
          </div>
          <div class="seckillproductlistprice">
            {{ item.spike_price }}
            <div class="original">
              {{ item.price }}
              <div class="delete">——</div>
            </div>
          </div>
          <div v-if="Immediatelykill">
            <div>秒杀</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { spike } from "../../api/spike";

export default {
  data() {
    return {
      seckillproductlist: [],
      Immediatelykill: true,
      seckillproducttime: null, //时间戳转化为00：00：00
      skilltimer: null, //倒计时
      createtime: null,
      lostertime: null,
    };
  },
  created() {
    spike({ type: "spike" }).then((res) => {
      let seckil_product = []; //在今天参与特价的商品
      let timer = null; //当前时间戳 3600
      let createtime = null; // 开始时间
      let lostertime = null; //结束时间
      let seckillproductlist = res.data;
      for (let i = 0; i < seckillproductlist.length; i++) {
        // 判断循环内的 商品是否是今天参与活动的商品
        if (this.showText(parseInt(seckillproductlist[i].createtime))) {
          seckil_product.push(seckillproductlist[i]);
            createtime = parseInt(seckillproductlist[i].createtime);
        lostertime = parseInt(seckillproductlist[i].lostertime);
        this.createtime = this.data(createtime);
        this.lostertime = this.data(lostertime);
        timer =
          parseInt(seckillproductlist[i].lostertime) -
          parseInt(seckillproductlist[i].createtime); //  拿到活动持续多少时间
        }
      }
      // ==================================================>
      console.log(timer, new Date(lostertime))
        setInterval(() => {
     
      if (new Date().getTime() < createtime) {
        this.seckillproducttime = "距离秒杀开始时间还剩" +  this.data(createtime - new Date().getTime());
        console.log(this.seckillproducttime, "1");
      }else if(new Date().getTime() > lostertime){
          this.seckillproducttime = "活动已结束"
      }else{
         this.seckillproducttime = "活动火热进行中 go! go! go!"
      }
    }, 1000);
    });
  },

  methods: {
    showText(timeString) {
      let date = new Date(timeString); //creattime 创建的时间 今天早上往数据库输入的时间`16`：00：00
      let today = new Date(); //现在时间
      today.setHours(0); //调节现在时间为00：00：00
      today.setMinutes(0);
      today.setSeconds(0);
      // today 为今天凌晨的时间
      let dayTime = 24 * 60 * 60 * 1000;
      let delta = today - date; // 得到相差的时间 ms 00：00：00   -
      if (delta > 0) {
        if (delta <= dayTime) {
          return false; // 输出 昨天
        } else if (delta <= 2 * dayTime) {
          return false; // 输出前天
        }
      } else if (-delta < dayTime) {
        return true; // 输出今天
      }
      return false; // 时间戳不对 或者明天
    },
    //  封装函数 时间戳转化为年月日

    data(timer) {
      let date = new Date(Number(timer));
      // let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let h =
        date.getHours() < 10
          ? "0" + date.getHours() + ":"
          : date.getHours() + ":";
      if (m < 10) {
        m = "0" + m + ":";
      } else {
        m + ":";
      }
      if (s < 10) {
        s = "0" + s;
      }
      return h + m + s;
    },
    seckillgoods(item) {
      this.$router.push({ path: "/home/detail", query: { id: item.id } });
    },
  },
};
</script>

<style>

.seckill {
  color: #ef875d;
}
.seckillcontainer {
  width: 80%;
  margin: 20px auto;
  height: 100%;
}
.miaosha {
  position: relative;
  margin-top: 20px;
  width: 100%;
  height: 700px;
  background: url("../../imgs/miaosha.jpg") no-repeat;
  background-size: 100%, 100%;
}
.miaoshatime{
  position: absolute;
  right: 50px;
  bottom: 100px;

}
.miaoshatime>h1{
  color: #fff;
  margin-bottom: 20px;
}
.miaoshatime>h3{
  color: #fff;
}
.seckillintor {
  width: 600px;
  margin-top: 20px;
}
.seckillproduct {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.seckillproductlist {
  margin-top: 30px;
  width: 33%;
  height: 450px;
  cursor: pointer;
  /* border: 1px solid #ccc; */
  padding: 10px 30px;
}
.seckillproductlistimg {
  width: 100%;
  height: 280px;
}
.seckillproductlistimg > img {
  width: 100%;
  height: 100%;
}
.seckillproductlisttitle {
  padding-top: 20px;
}
.seckillproductlisttitle_introduce {
  font-size: 12px;
  color: #ccc;
}
.text-overflow {
  width: 80%;
  /* 超出内容隐藏 单行打点  */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.seckillproductlistprice {
  height: 30px;
  line-height: 30px;
  display: flex;
  margin-top: 20px;
  color: red;
  font-size: 24px;
  font-weight: 600;
}
.seckillproductlistprice > .original {
  color: #ccc;
  font-size: 14px;
  position: relative;
  margin-left: 10px;
}
.delete {
  color: #ccc;
  position: absolute;
  font-size: 12px;
  top: 0;
  left: 0;
}
</style>