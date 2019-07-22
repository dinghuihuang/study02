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
    <el-tab-pane name="4" label="商品图片">
     <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-tab-pane>
    <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
  </el-tabs>
</el-upload>
</div>
</template>

<script>
  export default {
      name:"goodsAdd",
    data() {
      return {
        active: "1" , //数字转字符串，双引号
        fileList:[]
      };
    }, 
 methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  };
    
    
    
  

   
</script>
<style>

</style>
