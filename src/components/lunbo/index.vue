<template>
  <el-carousel :interval="5000" arrow="always" height="580px">
    <el-carousel-item v-for="(item,index) in imgs" :key="index">
     <img :src= "item.src" alt="" width="100%" height="100%">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name:"lunbo",
  data() {
    return {
        imgs: [
        { src: require("../../imgs/lunbo1.jpg") },
        { src: require("../../imgs/lunbo2.jpg") },
        { src: require("../../imgs/lunbo3.jpg") },
      ],
    }
  },
}
</script>
<style>
</style>