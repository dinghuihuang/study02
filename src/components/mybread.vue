<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my_bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{nav1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{nav2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name:'mybread',
  props: ['nav1','nav2']
  // created() {
  //   console.log(this.nav1);
  //   console.log(this.nav2);
  // }
}
</script>

<style lang='less' scoped>
.my_bread{
  height: 45px;
  line-height: 45px;
}
</style>
