 <template>
    <div>
        <!--文本框+按钮+栅格-->
        <el-col :span="4">
            <!--输入框 文本框-->
    <el-col>
  <el-col :span="4">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    </el-col>
  <el-col :span="2">
      <el-button type="success" plain>添加商品</el-button>
    </el-col>
</el-col>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </template>
  <script>
  export default {
     name: "goodsindex.vue",
    //数据
       data() {
    return {
      input3: "",
      select: "",

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    }
   },
     //方法
     methods: {
      handleSizeChange(size) {},
      handleCurrentChange(current) {}

     }
       };

</script>


