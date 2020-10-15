<template>
  <div class="home_bottom">
    <table class="home_footer">
      <tr>
        <th>关于乐居</th>
        <th>客户服务</th>
        <th>加入我们</th>
        <th>联系我们</th>
        <th>友情链接</th>
      </tr>
      <tr>
        <th> </th>
        <th> </th>
        <th> </th>
        <th> </th>
        <th>
          <a href="http://www.kuaidi.com/" target="_blank" class="expressage">快递查询API</a>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home_bottom {
  width: 100%;
  margin-top: 80px;
  width: 100%;
  height: 450px;
  background-color: #112b46;
}
.home_footer {
  width: 1200px;
  /* background-color: pink; */
  padding-top: 100px;
  margin: 0 auto;
}
.home_footer tr {
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.home_footer th {
  color: #fff;
  font-size: 20px;
}
.expressage {
  color: #fff;
}
</style>