<template>
  <div class="users">
    <!--面包屑-  mybread(用户管理，用户列表)--->
     <mybread nav1='商品管理' nav2='商品列表'></mybread>
     <!--路由出口-->
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "users",
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
    };
  },
 
};
</script>

<style lang='less' scoped>

</style>
