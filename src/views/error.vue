<template>
   <div class="error">
     <img src="../assets/404.gif" alt="" @click="tologin">
   </div>
</template>

<script>
export default {
 name:'error',
 created() {
    this.$message.error('哥们,你输入的地址不太对哦,点击那个滑板跳回去')
 },
 methods: {
    tologin(){
      this.$router.push('/login')
    }
 },
}
</script>

<style lang='less' scoped>
 .error{
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #7fbeed;
 }
</style>
