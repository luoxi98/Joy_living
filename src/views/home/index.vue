<template>
    <div class="Home">
        <home-header></home-header>
        <router-view></router-view>
        <home-bottom></home-bottom>

    </div>
</template>

<script>
import HomeHeader from './home-header';
import HomeBottom from './home-bottom';
export default {
        name:"Home",
        components:{
            HomeHeader,
            HomeBottom,
            
        }
}
</script>

<style>

</style>