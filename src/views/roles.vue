<template>
  <div class="users">
    <mybread nav1="权限管理" nav2="角色列表"></mybread>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="2">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 循环顶级row -->
          <el-row v-for="topLevel in props.row.children">
            <el-col :span="4">
              <el-tag  closable class="my_tag" type="primary" >{{topLevel.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="20">
              <el-row v-for="secondLevel in topLevel.children">
                <el-col :span="6">
                  <el-tag  closable class="my_tag" type="success">{{secondLevel.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <el-tag closable class="my_tag" type="warning" v-for="thirdLevel in secondLevel.children">{{thirdLevel.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 索引 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" ></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" ></el-table-column>
      <el-table-column label="操作" >
        <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
        <el-button type="warning" icon="el-icon-check" plain size="mini"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roles } from "../api/http";
export default {
  name: "roles",
  data() {
    return {
      input3: "",
      select: "",
      tableData: [],
      tags: [{ name: "标签一", type: "" }]
    };
  },
  created() {
    roles().then(backData => {
      //  console.log(backData);
      if (backData.data.meta.status == 200) {
        this.tableData = backData.data.data;
      }
    });
  }
};
</script>

<style lang='less' scoped>
.my_tag{
  margin-bottom: 10px;
  margin-right: 5px;
}
</style>
