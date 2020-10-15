<template>
  <div class="indexbottom">
    <div class="bottomindex">
      <div class="button_index_children" v-for="(item, index) in imgList" :key="index" :style="{background: `url(${item.imgUrl}) no-repeat`}" @click="open($event,item.imgUrl)">
        <div class="indexbottom_children"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexbottom",
  data() {
    return {
      imgList: [
        {
          imgUrl: require('@/imgs/indexbottom1.jpg')
        },
         {
          imgUrl: require('@/imgs/indexbottom2.jpg')
        },
         {
          imgUrl: require('@/imgs/indexbottom3.jpg')
        },
         {
          imgUrl: require('@/imgs/indexbottom4.jpg')
        },
         {
          imgUrl: require('@/imgs/indexbottom5.jpg')
        },
         {
          imgUrl: require('@/imgs/indexbottom6.jpg')
        },
      ]
    }
  },
  methods: {
    open(e,item) {
        this.$alert(`<img src="${item}" />`, {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false
        });
      }
  }
};
</script>

<style>
.bottomindex {
  width: 100%;
  height: 278x;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.button_index_children{
 width: 16.6%;
  height: 250px;
  cursor: pointer;
  background-size: contain;
}
.indexbottom_children {
  opacity: 0;
  width: 100%;;
  height: 250px;
  background: rgba(0, 0, 0, 0.9) url("../../imgs/index01.png") no-repeat 75px
    80px;
  transition: all 0.5s;
}
.indexbottom_children:hover {
  opacity: 1;
}
.el-message-box__message img{
  display:block;
  margin:0 auto;
}
.el-message-box{
  width:480px;
}
</style>