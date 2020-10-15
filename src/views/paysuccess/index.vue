<template>
  <div></div>
</template>

<script>
export default {
  created() {
   console.log(JSON.parse(this.$route.query.url))
    // window.location.href = JSON.parse(this.$route.query.url)
  },
}
</script>

<style>

</style>