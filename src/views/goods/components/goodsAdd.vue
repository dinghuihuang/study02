<template>
    <div>
        <!--alert-->
        <el-alert
        title="添加商品信息"
        type="info"
        show-icon>
        </el-alert>
        <!--步骤-->   <!--parseInt(active)--字符串转数字-->
    <el-steps :active="parseInt(active)" finish-status="success">
  <el-step title="基本属性"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="商品属性"></el-step> 
  <el-step title="商品图片"></el-step>
  <el-step title="商品内容"></el-step>
</el-steps>
  <el-tabs v-model='active' tab-position="left" style="height: 200px;">
    <el-tab-pane name="1" label="基本属性">基本属性</el-tab-pane>
    <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
    <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
    <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
    <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
  export default {
      name:"goodsAdd",
    data() {
      return {
        active: "1"  //数字转字符串，双引号
      }
    }
    };

   
</script>
<style>

</style>
