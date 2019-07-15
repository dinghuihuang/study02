<template>
   <div class="login">
     <div class="form_box">
        <el-form   :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  label-position="top">
     <h2>用户登录</h2>
  <el-form-item label="用户名" prop="username" >
    <el-input type="text" v-model="ruleForm.username" autocomplete="off" ></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" class="my_btn">提交</el-button>
  </el-form-item>
</el-form>
     </div>
   </div>
</template>

<script>
import { login } from '../api/http'
export default {
  name:'login',
  data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 4, max: 12, message: '长度在 4 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 4, max: 21, message: '长度在 4 到 21 个字符', trigger: 'change' }
          ]
          
        }
      };
    },
    methods: {
      submitForm(formName) {
             // 获取设置ref的元素 this.$refs.xxx
      // console.log(this.$refs)
      // 调用了 饿了么ui的form组件的 验证方法 饿了么提供的
      // 回调函数中， valid有值说明成功了，没有值失败了        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            login(this.ruleForm).then(backData=>{             
              console.log(backData);
              if (backData.data.meta.status==200) {
                 this.$message.success(backData.data.meta.msg)
                 this.$router.push('./index')
                  // 保存token
                  window.sessionStorage.setItem('token',backData.data.data.token)
              }else if(backData.data.meta.status==400){
                this.$message.error(backData.data.meta.msg)
              }
              
            })
          } else {
             this.$message.error("哥们，你有东西没有写哦！");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang='less' scoped>
  
   .login{
     width: 100%;
     height: 100%;
     background-color: #324152;
     display: flex;
    // 垂直方向水平对齐
     justify-content: center;
    //  水平方向垂直对齐
     align-items: center;
     h2 {
       margin-bottom: 20px;
     }
     .form_box{
       width: 580px;
       height: 440px;
        margin: 50px auto;
        background-color: #fff;
        border-radius: 15px;
        padding: 60px 40px;
        box-sizing: border-box;
       .my_btn{
         width: 100%;
       }
     }
   }
</style>
