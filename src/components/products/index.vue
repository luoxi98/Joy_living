<template>
  <div class="product">
    <el-menu :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-submenu index="2">
        <template slot="title">产品展示</template>
        <el-menu-item @click="classify(item,index)" v-for="(item, index) in classifyTitle" :key="index" :index="'2-'+index+1">{{item}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      classifyTitle: ['床', '灯', '储物柜', '沙发', '桌椅', '橱柜', '布艺','浴室'] // 分类名称
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    classify(item,index){
      // 传index 为了和左边固定栏联动
      this.$router.push({path:"/home/products",query:{type_one:item,index}}).catch(err => {err})
    }
  },
};
</script>
<style>
.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 40px;
    line-height: 24px;
    border-bottom: 2px solid transparent;
    color: #000;
    font-weight:600;
    font-size:18px;
}
.el-menu-item, .el-submenu__title {
    height: 40px;
    line-height: 24px;
    position: relative;
    white-space: nowrap;
    list-style: none;
}
.el-menu.el-menu--horizontal {
    border-bottom: solid 0px;
}
.el-menu::after, .el-menu::before {
    content: "";
}
.el-menu.el-menu--horizontal {
    border-bottom: solid 0px;
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
    border-bottom: 0px solid;
    color: #303133;
}
</style>