<template>
  <div class="users">
    <mybread nav1="用户管理" nav2="用户列表"></mybread>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="7">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          @keyup.enter.native="search"
        >
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
          <el-switch
            v-model="scope.row.mg_state"
            @change="changestatus(scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改 -->
          <el-button
            icon="el-icon-edit"
            plain
            type="primary"
            size="mini"
            @click="enterEdit(scope.row)"
          ></el-button>
          <!-- 删除这一行 -->
          <el-button
            size="mini"
            plain
            icon="el-icon-delete"
            type="danger"
            @click="delOne(scope.row)"
          ></el-button>
          <!-- 点击分配角色 -->
          <el-button
            size="mini"
            plain
            type="warning"
            icon="el-icon-check"
            @click="showRole(scope.row)"
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
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 对话框 新增框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <!--ref的一会可以获取到  -->
      <el-form ref="ruleForm" :rules="rules" :model="form" label-position="top">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- // 修改框 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <!--ref的一会可以获取到  -->
      <el-form ref="ruleForm" :rules="rules" :model="editForm" label-position="top">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="editForm.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="roleFormVisible">
      <el-form :model="roleForm">
        <el-form-item label="当前用户" label-width="120px">{{roleForm.userName}}</el-form-item>
        <el-form-item label="请选择用户角色" label-width="120px">
          <el-select v-model="roleForm.role" placeholder="请选择角色">
            <el-option label="请选择角色" value="shanghai" disabled></el-option>
            <el-option v-for="item in roleList" :label="item.roleName" :value="item.id"></el-option>
           
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="disRolese">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  users,
  addUsers,
  deleteUser,
  updateUserState,
  updateUserInfo,
  disRoles,
  roles
} from "../api/http.js";
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
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑框对应的数据
      editForm: {
        username: "",
        mobile: "",
        email: "",
        // 用户id 方便一会编辑
        id: ""
      },
      // 修改
      editFormVisible: false,
      // 角色列表
      roleList: [],
      //分配角色
      roleFormVisible: false,
      roleForm: {
        userName: "",
        role: "",
        id: 0
      },
      // 总页数
      total: 0,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 21, message: "长度在 5 到 21 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.search();
  },
  methods: {
    disRolese(){
      if(typeof(this.roleForm.role)=='string'){
        this.roleFormVisible=false
        return
      }
      disRoles({id:this.roleForm.id,rid:this.roleForm.role}).then(backData=>{
        // console.log(backData);
        if (backData.data.meta.status==200) {
            this.roleFormVisible=false
            this.$message.success(backData.data.meta.msg)
            this.search()
        }
        
      })
    },
    showRole(row){
    // console.log(row);
    this.roleForm.userName=row.username
     this.roleForm.role=row.role_name
     this.roleForm.id=row.id
     this.roleFormVisible=true
     roles().then(backData=>{
      //  console.log(backData);
      if (backData.data.meta.status==200) {
          this.roleList=backData.data.data
      }
       
     })
    
    },
    saveEdit() {
      updateUserInfo(this.editForm).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.$message.success("小样，改好了哟！！！");
          // 关闭弹框
          this.editFormVisible = false;
          // 重新获取数据
          this.search();
        }
      });
    },
    //进入编辑 row就是这一行的数据
    enterEdit(row) {
      this.editFormVisible = true;
      this.editForm = row;
    },
    //修改状态
    changestatus(row) {
      // console.log(row);
      updateUserState({ id: row.id, type: row.mg_state }).then(backData => {
        //  console.log(backData);
        if (backData.data.meta.status == 200) {
          this.search();
          this.$message.success("修改成功");
        }
      });
    },
    // 删除
    delOne(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser({ id: row.id }).then(backData => {
            console.log(backData);
            if (backData.data.meta.status == 200) {
              this.search();
              this.$message.success("删掉了,开心了吧");
            }
          });
        })
        .catch(() => {
          this.$message("想清楚点,小老弟");
        });
    },
    // 搜索
    search() {
      users({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pageSize
      }).then(backData => {
        // console.log(backData);
        if (backData.data.meta.status == 200) {
          this.tableData = backData.data.data.users;
          // 保存总条数
          this.total = backData.data.data.total;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addUsers(this.form).then(backData => {
            //  console.log(backData);
            if (backData.data.meta.status == 201) {
              this.dialogFormVisible = false;
              this.search();
            }
          });
        } else {
          this.$message.warning("数据格式不对,请检查");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
</style>
