<template>
  <div class="hotproduct">
    <div class="container">
      <h1>热销产品</h1>
      <div class="popular">
        <ul>
          <li v-for="(item, index) in goodList" :key="index" @click="hotgoods(index)">
            <img :src="item.img_list" alt="">
            <div class="text-overflow">{{item.introduce}}</div>
            <div class="price">￥{{item.price}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getProduct} from "../../api/product"
export default {
    data() {
        return {
           id:[1,600,33,44,204,520,77,88],
           goodList: []
        }
    },
    created() {
        for(let i of this.id) {
            getProduct({
                id: i
            }).then(res => {
                this.goodList.push(res.data[0])
            })
        }
    },
    methods: {
     hotgoods(index){
       this.$router.push({path:"/home/detail",query:{id:this.goodList[index].id}})
       console.log(this.goodList);
     }
    },
};
</script>

<style>
.hotproduct {
  margin-top: 30px;
  background-color: #f8f8f8;
}
.hotproduct h1 {
  font-weight: normal;
}
.popular ul{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    align-content: space-around;
    justify-content: space-between
}
.popular ul li{
    width: 23%;
    height: 480px;
    background-color: #fff;
    margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.5s;
}
.popular ul li:hover{
    box-shadow: 0 10px 20px rgba(0,0,0,0.5);
	transform: translateY(-5px);
}
.popular ul li img{
    width: 90%;
    height: 300px;
    margin: 20px auto;
}
.text-overflow{
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
</style>