<template>
<div class="personalcenter">
  <personalnav></personalnav>
  <div class="personalcontain">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import personalnav from "./personal_nav"
export default {
    components:{
        personalnav
    }
}
</script>

<style>
.personalcenter{
    width: 1150px;
    margin: 0 auto;
    display: flex;
}
.personalcontain{
    /* background-color: pink; */
    padding-top: 10px;
    width: 100%;
}

</style>