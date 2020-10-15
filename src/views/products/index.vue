<template>
  <div class="typeone">
    <div class="container">
      <div class="product_right">
              <div class="product_nav">
                <span class="product_price">价格</span>       
                  <div class="sanjiao">
                    <i class="iconfont icon-shangjiantou" @click="upchange"> </i>
                    <i class="iconfont icon-xiajiantou1" @click="downchange"></i>
                  </div>
                  <div class="rangesmall">
                      <input type="text" value="$">
                </div>
                      -
                <div class="rangebig">
                    <input type="text" value="$">
                </div>
                <div class="sure">
                  <button>确定</button>
                </div>
          </div>
                    <div class="product_list">
                         <div v-for="(item,index) in newbigArr" :key="index">
                           <h2>{{item.title}}</h2>
                           <ul class="product_listarr"> 
                              <router-link tag="li" v-for="(list,index1) in item.Arr" :key="index1" :to="{path:'/home/detail',query:{id: list.id}}">
                                <img :src="list.img_list[0]" alt="">
                                <div class="text_introduce">
                                  {{list.introduce}}
                                </div>
                                  <div class="price">￥{{list.price}}</div>
                                  <!-- <div class="product_collect"> -->
                                    <!-- 停止跳转 阻止事件继续传播停止push 也就是 不让他跳转 -->
                                         <!-- <i @click="changestar(index)" class="iconfont icon-star" ref="product_icon"></i> -->
                                  <!-- </div> -->
                              </router-link>
                           </ul>
                         </div>
                    </div>
                   
      </div>
    </div>
     <div class="product_fixed">
      <div class="product_left" @click="classitytwo(item,index)"  v-for="(item, index) in classifyTitle" :key="index"> 
       <div class="product_title" :class="{changcolor:indexlist == index}">{{item}}</div> 
       </div>
      </div>
  </div>
</template>

<script>
import { gettypeone } from "../../api/typeone";
export default {
  created() {
     this.product(this.$route.query.type_one);
  },
  mounted() {
        // 初始化index 导航index赋值给indeslist
        this.indexlist = this.$route.query.index
        console.log(this.$refs.product_icon); 
  },
  data() {
    return {
      type_one: null,
       classifyTitle: ['床', '灯', '储物柜', '沙发', '桌椅', '橱柜', '布艺','浴室'], // 分类名称
       newbigArr:[], 
       indexlist:0,
       collectcolor:true
    
    };
  },
  beforeRouteUpdate(to, from, next) {
    // 不能用this.$route.query.index 这个表示的是上一个
        //to.query.index 表示的是当前页面的 query:{type_one:item,index}
        this.indexlist = to.query.index 
        this.product(to.query.type_one)
    next();
  },
  methods: {
    // 收藏点击变色
  //  changestar(index){
  //    console.log(index)
  //    if(this.collectcolor){
  //      this.$refs.product_icon[index].className = 'iconfont icon-wujiaoxing';
  //      this.collectcolor = false
  //    }else{
  //      this.$refs.product_icon[index].className = 'iconfont icon-star';
  //      this.collectcolor = true
  //    }
     
  //    console.log(this.$refs.product_icon[index])
  //   },
    upchange(){
    for(let i = 0;i<this.newbigArr.length;i++){
                this.newbigArr[i].Arr.sort((a,b)=>{
                  return b.price - a.price
                })
          this.newbigArr[i].Arr
        }
       
        
    },
    downchange(){
         for(let i = 0;i<this.newbigArr.length;i++){
                this.newbigArr[i].Arr.sort((a,b)=>{
                  return a.price - b.price
                })
          this.newbigArr[i].Arr
        }
    },
    product(params) {
      gettypeone({ type_one: params })
        .then((res) => {
          // 图片预处理 
          for(let a = 0; a<res.data.length;a++){
            // 将字符串转化为数组
            res.data[a].img_list= res.data[a].img_list.split(',')
          }
          console.log(res.data);
          let restwo = []; //数组去重的typetwo
          let newbigArr =  [];//外面最大的数组[]
          let newObj = {};//{title:"",Arr:[]}
          var newArr = [];//[]

          // 循环 获取type_two 添加到restwo
          for (var i = 0; i < res.data.length; i++) {
            if (restwo.indexOf(res.data[i].type_two) == -1) {
              restwo.push(res.data[i].type_two);
            }
          }

          // 把type_two的放一起
          for(let j = 0;j<restwo.length;j++){
            newObj.title = restwo[j]; //把type_two放到newobj里面去
            for(let x = 0;x<res.data.length;x++){
                if(restwo[j] == res.data[x].type_two){
                  newArr.push(res.data[x])
                }
            }
            // 将分类好的type——two放到nweObj中
            newObj.Arr = newArr;
            newbigArr.push(newObj);
            // 初始化
            newObj = {};
            newArr = [];
          }
          console.log(newbigArr);
          this.newbigArr = newbigArr
        })
        .catch((err) => {
          console.log(err);
        });
    },
       classitytwo(item,index){
        //  避免路由的冗余  本页面跳转本页面
      this.$router.push({path:"/home/products",query:{type_one:item,index}}).catch(err => {err}) 
    },
  },
};
</script>

<style>
.container {
  width: 80%;
  margin: 0 auto;
}
.product_right{
    width:95%;
    margin-left: 90px; 
  }
.product_nav{
  width:90%;
  height: 40px;
  background-color: #f7f7f7;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.product_price {
  line-height: 40px;
  font-size: 16px;
  margin-left: 20px;
}
.sanjiao {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  line-height: 10px;
  cursor: pointer;
}
.rangesmall input{
  border: 1px solid #ccc;
  background-color: #fff;
  width: 35px;
  height: 20px;
  border-radius: 2px;
  margin-left: 20px;
  margin-right: 10px;
  font-size: 12px;
}
.rangebig input{
  border: 1px solid #ccc;
  background-color: #fff;
  margin-left: 10px;
  width: 35px;
  height: 20px;
  border-radius: 2px;
  font-size: 12px;
}
.sure button{
  width: 30px;
  height: 20px;
  margin-left: 20px;
  border: 1px solid #ccc;
  cursor: pointer;
  font-size: 12px;
}
.product_fixed{
  top:200px;
  left: 5px;
  margin-top: 50px;
width: 150x;
 border: 1px solid #ccc;
 position: fixed;
 padding: 20px;
}
.product_left{
  width: 150x;
  cursor: pointer;
  line-height: 50px;
  font-size: 20px;
}
.product_title{
  line-height: 20px;
  margin-top: 20px;
}
.product_title:hover{
  color:#97d1c9;
}
.changcolor{
  font-size: 25px;
  color: #97d1c9;
  font-weight: 800;
}
.product_list{
  width: 100%;
  margin-top: 30px;
}
.product_list h2{
  line-height: 30px;
  height: 30px;
}
.product_listarr{
  background-color: #f8f8f8;
  width: 90%;
   display: flex;
    flex-wrap: wrap;
    list-style: none;
    align-content: space-around;
    justify-content: space-around
}
.product_listarr li{
    width: 30%;
    height: 480px;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.5s;
}
.product_listarr li:hover{
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
	transform: translateY(-5px);
}
.product_listarr li img{
     width: 90%;
    height: 300px;
    margin: 20px auto;
}
.text_introduce{
    width: 80%;
    /* 超出内容隐藏 单行打点  */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin:0 auto;
}
.price{
   font-size: 30px;
    width:80%;
    margin:0 auto;
    margin-top: 30px;
    text-align: left;
}
.product_collect{
    width:80%;
    margin:0 auto;
    margin-top: -30px;
    text-align: right;
}
.product_collect i{
    font-size: 20px;
}
</style>