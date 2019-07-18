<template>
  <div class="users">
    <mybread nav1="用户管理" nav2="用户列表"></mybread>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="7">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="success" plain>添加用户</el-button>
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
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
          <el-button
            size="mini"
            plain
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.row)"
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
  </div>
</template>

<script>
import { users } from "../api/http.js";
export default {
  name: "users",
  data() {
    return {
      value: true,
      input3: "",
      select: "",
      tableData: [],
      query: "",
      pagenum: 1,
      pageSize: 10
    };
  },
  created() {
    users({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pageSize
    }).then(backData => {
      console.log(backData);
      if (backData.data.meta.status == 200) {
        this.tableData = backData.data.data.users;
      }
    });
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang='less' scoped>
</style>
