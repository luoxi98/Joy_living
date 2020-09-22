<template>
    <div class="Home">
        <home-header></home-header>
        <router-view></router-view>
    </div>
</template>

<script>
import HomeHeader from './home-header';
export default {
        name:"Home",
        components:{
            HomeHeader,
        }
}
</script>

<style>

</style>