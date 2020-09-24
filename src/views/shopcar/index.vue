<template>
  <div>
        <el-button type="primary" v-show="timeTrue == true" @click="acquire">获取验证码</el-button> 
        <el-button type="primary" v-show="timeTrue == false" >{{ time }}秒后重新获取</el-button >
  </div>
</template>

<script>
export default { 
 data() {   
 return {  
   timeTrue: true,   //显示
   time: 0            //默认0
 }; 
 }, 
 created() {},  
methods: {   
   acquire() {  
     this.timeTrue = false;   //点击获取验证码
     this.time = 60;          //time变为60
     var setTimeoutS = setInterval(() => {  
      this.time--;   //定时器 
     if (this.time <= 0) {      //time<0 
     clearInterval(setTimeoutS);  //清除定时器
        this.timeTrue = true;      //显示获取验证码
  }   
   }, 1000); 
   }, 
 }
}
</script>
<style>

</style>