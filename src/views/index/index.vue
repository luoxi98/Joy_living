<template>
  <div class="index">
    <service></service>
    <lunbo></lunbo>
    <features></features>
      <div class="index_foot" @click="love">
        <img src="../../imgs/indexbottom.jpg" alt="">
        <h1>爱 的 选 择，家 的 感 觉</h1>
      </div>
      <hotproduct></hotproduct>
    <index-bottom></index-bottom>

  </div>
</template>

<script>
import lunbo from "../../components/lunbo";
import features from "../../components/features";
import IndexBottom from '../../components/indexbottom';
import hotproduct from "../../components/hotproduct";
import service from "../../components/service"

export default {
  components: {
     lunbo,
     features,
     IndexBottom,
     hotproduct,
     service
 
   },
   methods: {
     love(){
       this.$router.push({path:"/home/products",query:{type_one:"沙发"}})
     }
   },
};
</script>

<style>

.index_foot{
  margin-top: 50px;
  position: relative;
  height: 610px;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
}
.index_foot h1{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  font-size: 60px;
  font-weight: normal;

}
.index_foot img{
  transition: all 0.5s;
}
.index_foot:hover img{
 transform: scale(1.1);
}
</style>