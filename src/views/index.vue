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
          <a href="#" class="logout" @click.prevent="logOut">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <!-- 左侧导航 -->
    <el-container>
      <el-aside width="200px" class="my_aside">
        <el-menu
          default-active="5"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :unique-opened="true"
          :router='true'
        >
          <!-- 左侧导航 -->
          <el-submenu  v-for="(item,index) in menuList"   :index="''+index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(it,i) in item.children" :index="'/index/'+it.path">
                <i class="el-icon-menu"></i>
                {{it.authName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import {menus}  from '../api/http'
export default {
  name: "index",
  created() {
    menus().then(backData=>{
    //  console.log(backData);
    if (backData.data.meta.status==200) {
    this.menuList=backData.data.data
      
    }
     
    })
  },
  data() {
    return {
      isCollapse: false,
      menuList:[]
    };
  },
  methods: {
    logOut(){
      this.$confirm('此操作将会退出, 是否继续?', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.sessionStorage.removeItem('token')
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功'
          });
        }).catch(() => {
          this.$message('你真好!!!');          
        });
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
    padding-top: 0px;
  }
}
</style>
