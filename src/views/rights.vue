<template>
  <div class="users">
    <mybread nav1="权限管理" nav2="权限列表"></mybread>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width='180'></el-table-column>
      <el-table-column prop="level" label="层级" width='180'></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rightList } from "../api/http.js";
export default {
  name: "rights",
  data() {
    return {
      input3: "",
      select: "",
      tableData: []
    };
  },
  created() {
    rightList().then(backData => {
      // console.log(backData);
      if (backData.data.meta.status == 200) {
        for (let i = 0; i< backData.data.data.length; i++) {
           switch (backData.data.data[i].level) {
          case "0":
            backData.data.data[i].level='一级'
            break;
            case "1":
            backData.data.data[i].level='二级'
            break;
            case "2":
            backData.data.data[i].level='三级'
            break; 
        }
          
        }
        this.tableData = backData.data.data;
      }
    });
  }
};
</script>

<style lang='less' scoped>
</style>
