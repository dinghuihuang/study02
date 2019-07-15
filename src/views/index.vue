<template>
  <el-container class="my_content">
    <el-header class="my_header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.jpg" alt class="logo" />
        </el-col>
        <el-col :span="19">
          <h2 class="title">电商后台管理页面</h2>
        </el-col>
        <el-col :span="1">
          <a href="#" class="logout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <!-- 左侧导航 -->
    <el-container>
      <el-aside width="200px" class="my_aside">
        <el-menu
          default-active="5"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :unique-opened="true"
        >
          <!-- 左侧导航 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">
                <i class="el-icon-menu"></i>
                数据列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="my_main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.my_content {
  height: 100%;
  .my_header {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
    .logo {
      height: 60px;
    }
    .title {
      text-align-last: center;
      color: #fff;
    }
    .logout {
      // background-color: hotpink;
      color: yellow;
      padding-right: 5px;
      text-decoration: nono;
      float: right;
      box-sizing: border-box;
      display: block;
      height: 60px;
    }
  }
  .my_aside {
    background-color: #fff;
  }
  .my_main {
    background-color: #e9eef3;
  }
}
</style>
