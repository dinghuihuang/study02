<template>
    <div>
        <!--alert-->
        <el-alert
        title="添加商品信息"
        type="info"
        show-icon>
        </el-alert>
        <!--步骤-->
    <el-steps :active="active" finish-status="success">
  <el-step title="基本属性"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="商品属性"></el-step> 
  <el-step title="商品图片"></el-step>
  <el-step title="商品内容"></el-step>
</el-steps>
  <el-tabs tab-position="left" style="height: 200px;">
    <el-tab-pane label="基本属性">基本属性</el-tab-pane>
    <el-tab-pane label="商品参数">商品参数</el-tab-pane>
    <el-tab-pane label="商品属性">商品属性</el-tab-pane>
    <el-tab-pane label="商品图片">商品图片</el-tab-pane>
    <el-tab-pane label="商品内容">商品内容</el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
  export default {
      name:"goodsAdd",
    data() {
      return {
        active: 1
      }
    }
    };

   
</script>
<style>

</style>
