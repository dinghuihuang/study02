<template>
  <div class="users">
    <mybread nav1="用户管理" nav2="用户列表"></mybread>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select" @keyup.enter.native="search">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="success" plain @click="dialogFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" 
          @change="changestatus(scope.row)"
          active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            plain
            type="primary"
            size="mini"
            @click="handleEdit(scope.row)"
          ></el-button>
          <!-- 删除这一行 -->
          <el-button
            size="mini"
            plain
            icon="el-icon-delete"
            type="danger"
            @click="delOne(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            @click="handleDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40"
    ></el-pagination>
    <!-- 对话框  新增框 -->
    <el-dialog title="添加用户"  :visible.sync="dialogFormVisible">
      <!--ref的一会可以获取到  -->
  <el-form :model="form"  ref="ruleForm" :rules="rules" >
    <el-form-item label="用户名" prop='username' label-width="100px" >
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
    
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { users,addUsers,deleteUser } from "../api/http.js";
export default {
  name: "users",
  data() {
    return {
      value: true,
      select: "",
      tableData: [],
      //搜索
      query: "",
        // 页码
      pagenum: 1,
      //页容量
      pageSize: 10,
      // 默认关闭
      dialogFormVisible: false,
      form:{
        username:'',
        password:'',
        email:'',
        mobile:''

      },
      // 编辑框对应的数据
      editForm: {
        username: "",
        mobile: "",
        email: "",
        // 用户id 方便一会编辑
        id: ""
      },
      // 总页数
      total: 0,
      rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 21, message: '长度在 5 到 21 个字符', trigger: 'blur' }
          ]
      }

    };
  },
  created() {
   this.search()
  },
  methods: {
    //修改状态
    changestatus(row){

    },
    // 删除
    delOne(row){
     this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           deleteUser({id:row.id}).then(backData=>{
             console.log(backData);
             if(backData.data.meta.status==200){
               this.search();
               this.$message.success("删掉了,开心了吧")
             }
             
           })
        }).catch(() => {
          this.$message("想清楚点,小老弟");          
        });
    },
    search(){
      users({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pageSize
    }).then(backData => {
      // console.log(backData);
      if (backData.data.meta.status == 200) {
        this.tableData = backData.data.data.users;
      }
    });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    submitForm(formName){
     this.$refs[formName].validate((valid) => {
          if (valid) {
             addUsers(this.form).then(backData=>{
              //  console.log(backData);
               if (backData.data.meta.status==201) {
                   this.dialogFormVisible=false
                   this.search()
               }
               
             })
          } else {
            this.$message.warning("数据格式不对,请检查")
            return false
          }
        });
    },
  }
};
</script>

<style lang='less' scoped>
</style>
