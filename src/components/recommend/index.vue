<template>
  <div class="recommend">
     <div class="recommendcontainer">
       <h1>猜你喜欢</h1>
       <div class="recommendlist">
            <div class="recommendlistone"  v-for="(item,index) in recommendlist"  :key="index" @click="recommend(item)">
                  <div class="recommendlistoneimg">
                        <img :src="item.img_list[0]" alt="">
                  </div>
                  <div class="recommendlistonetitle">
                        <h3>{{item.title}}</h3>
                        <span class="recommendlistonetitle_introduce text-overflow">{{item.introduce}}</span>
                  </div>
                  <div class="recommendlistoneprice">
                      {{item.price}}
                  </div>

            </div>
       </div>
     </div>
  </div>
</template>

<script>
import { like } from "../../api/like" 
export default {
  data() {
    return {
      recommendlist:[],
    }
  },
  created() {
    like().then(res=>{
      console.log(res.data)
      this.recommendlist = res.data
    })
  },
  methods: {
    recommend(item){
 this.$router.push({path:"/home/detail" ,query:{id:item.id}}) 
    }
  },

}
</script>

<style>
.recommendcontainer{
  width: 100%;
  margin: 20px auto;
  /* background-color: pink; */
}
.recommendcontainer>h1{
  color: #EF875D;

}
.recommendlist{
     width: 100%;
    display: flex;
    flex-wrap: wrap;
}
    .recommendlistone{
    margin-right: 20px;
    margin-top: 30px;
    width: 30%;
    height: 450px;
    padding: 10px;
    cursor: pointer;
    }
.recommendlistoneimg>img{
      width: 100%;
      height: 280px;
}
.recommendlistonetitle{
      padding-top: 20px;
}
.recommendlistonetitle_introduce{
      font-size: 12px;
    color: #ccc;
}
.text-overflow{
      width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.recommendlistoneprice{
    height: 30px;
    line-height: 30px;
    display: flex;
    margin-top: 20px;
    color: red;
    font-size: 24px;
    font-weight: 600;
}
</style>