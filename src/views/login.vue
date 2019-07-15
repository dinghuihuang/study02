<template>
   <div class="login">
     <div class="form_box">
        <el-form   :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"  label-position="top">
     <h2>用户登录</h2>
  <el-form-item label="用户名" prop="pass" >
    <el-input type="text" v-model="ruleForm.pass" autocomplete="off" ></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" class="my_btn">提交</el-button>
  </el-form-item>
</el-form>
     </div>
   </div>
</template>

<script>
export default {
  name:'login',
  data() {
    
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('密码错误'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
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
