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
     <!-- 此处地址并没有让图片传入服务器，必须要改成基地址才行 -->
     <el-upload
       class="upload-demo"   
      action="http://localhost:8888/api/private/v1/upload" 
      :headers="sendHeaders"   
      :file-list="fileList"
       list-type="picture"
       :on-success='success'
  >
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-tab-pane>
    <el-tab-pane name="5" label="商品内容">
     <quillEditor></quillEditor> 
     </el-tab-pane>
  </el-tabs>
</el-upload>
</div>
</template>

<script>
// require styles  导入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//导入富文本组件
import { quillEditor } from 'vue-quill-editor'

  export default {
      name:"goodsAdd",
      //局部注册组件
       components:{
        quillEditor
      },
    data() {
      return {
        active: "1" , //数字转字符串，双引号
        fileList:[],
        sendHeaders:{
          //设置token
          Authorization:window.sessionStorage.getItem('token')
        }
      };
    }, 
 methods: {
        success(){
          console.log('成功了');
        },
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
