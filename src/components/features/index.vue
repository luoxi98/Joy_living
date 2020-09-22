<template>
  <div class="features">
    <div class="container">
    <div class="features_one">
      <div class="features_typeone">
         <router-link to="/home/products"><img src="../../imgs/deng.jpg" alt=""></router-link> 
      </div>
      <div class="features_typetwo">
         <router-link to="/home/products"><img src="../../imgs/baozhen.png" alt=""></router-link>
      </div>
    </div>
    <div class="features_two">
      <div class="features_typethree">
           <router-link to="/home/products"> <img src="../../imgs/sofa.jpg" alt=""> </router-link>
      </div>
      <div class="features_typefour">
           <router-link to="/home/products"> <img src="../../imgs/chair.jpg" alt=""> </router-link>
      </div>
      <div class="features_typefive">
          <router-link to="/home/products"> <img src="../../imgs/sale.jpg" alt=""> </router-link>
      </div>
    </div>
  </div>
   </div>
</template>

<script>
export default {};
</script>

<style>
.features {
  background: #f8f8f8;
  height: 100%;
  width: 100%;
  margin: 0 auto;
   padding-top: 40px;
}
.container{
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
.features_one{
  width: 100%;
  height:460px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  
}
.features_one img{
  width: 100%;
  height: 100%;
}
.features_typeone{
  width: 49%;
  height: 100%;
  transition: all 0.6s;
}
.features_typeone:hover{
   transform: translateX(-20px) translateY(-5px);
}
.features_typetwo{
  width: 49%;
  height: 100%;
  background-color: #fff;
  transition: all 0.6s;
}
.features_typetwo:hover{
  transform: translateX(-20px) translateY(-5px);
}
.features_two{
    width: 100%;
    height: 426px;
    margin-top:30px;
    display: flex;
    justify-content: space-between;
}
.features_two img{
  width: 100%;
  height: 100%;
}
.features_typethree{
  width: 29%;
  height: 100%;
  transition: all 0.6s;
}
.features_typethree:hover{
   transform: translateX(-20px) translateY(-5px);
}
.features_typefour{
  width: 38%;
  height: 100%;
  transition: all 0.6s;
}
.features_typefour:hover{
   transform: translateX(-20px) translateY(-5px);
}
.features_typefive{
  width: 29%;
  height: 100%;
  transition: all 0.6s;
}
.features_typefive:hover{
  transform: translateX(-20px) translateY(-5px);
}





</style>