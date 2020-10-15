<template>
  <div class="about">
    <div class="aboutcontainer">
      <h1>关于乐居</h1>
      <div class="aboutimg">
        <div class="abouylf">
          <div class="abouylftop">
            <h1>Joy_Living·使命</h1>
            <h3 class="abouylftop_advertise">乐居，致力于实现完美品质生活！</h3>
            <p class="describe">
              乐居提供的不仅仅是产品与服务，而是对梦想生活的执着。富有想象的设计，品质至臻的产品，高效真诚的服务，让人们在时尚与现代中享受快乐幸福的家居生活。
            </p>
          </div>
          <div class="aboutlfbottom">
            <h1>Joy_Living 核心价值观</h1>
            <h3 class="abouylftop_advertise">创新、卓越、进取、共赢</h3>
            <p class="describe">
              乐居，作为最优秀的家居缔造者，创新永无止境，对品质的苛刻要求成就了乐居卓越的品牌形象。在乐居的字典里，共赢是永恒的，与客户共赢，
              与竞争对手共赢，与消费者共赢，与广大创业者共赢。持续创新，不断进取，引领行业追求卓越，创造完美品质生活。
            </p>
          </div>
        </div>
        <div class="aboutrg">
          <div class="aboutrgimg">
            <h1>Joy_Living ·奋斗目标</h1>
            <h3 class="aboutrgimg_adcersize">为客户创造价值、为用户实现完美高品质生活 立志打造百年品牌</h3>
            <p class="describe">乐居不断创新，设计更具有颠覆性，追求卓越、创造完美的品质与服务，不断提升着自身的品牌价值，成为了行业高端品牌的标志，让人们在品味产品的同时更感受着来自品牌的自豪与荣耀。乐居，高端全屋定制家居五金。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.aboutcontainer {
  width: 90%;
  margin: 20px auto;
}
.abouylf {
  width: 50%;
  display: flex;
  flex-direction: column;
}
.aboutimg {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.3);
	transform: translateY(-5px);
}
.abouylftop {
  padding: 20px;
  width: 100%;
  height: 350px;
  background: url("../../imgs/aboutone.jpg") no-repeat;
  background-size: 100%, 100%;
}
.aboutlfbottom {
  color: #302d2d;
  padding: 20px;
  width: 100%;
  height: 350px;
  background: url("../../imgs/aboutthree.jpg") no-repeat;
  background-size: 100%, 100%;
}
.abouylftop > h1 {
  color: #20ae9e;
  font-size: 35px;
  font-weight: normal;
}
.aboutlfbottom > h1 {
  color: #20ae9e;
  font-size: 35px;
  font-weight: normal;
}
.abouylftop_advertise {
  margin: 40px auto;
  font-size: 30px;
  font-weight: normal;
  color: #302d2d;
}
.describe {
  font-size: 14px;
  line-height: 30px;
  width: 80%;
}
.aboutrg {
  padding: 20px;
  height: 700px;
  width: 50%;
  background: url("../../imgs/abouttwojpg.jpg") no-repeat;
  background-size: 100%, 100%;
}
.aboutrgimg > h1 {
  color: #20ae9e;
  font-size: 35px;
  font-weight: normal;
}
.aboutrgimg_adcersize{
    margin: 40px auto;
  font-size: 25px;
  font-weight: normal;
  color: #302d2d;
}
</style>