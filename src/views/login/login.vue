<template>
  <div class='login'>
    <!--    注册/登陆面板-->
    <div class='panel'>
      <loginPanel></loginPanel>
    </div>

  </div>
</template>

<script setup lang='ts'>
import loginPanel from './cpns/loginPanel.vue'


</script>

<style scoped lang='less'>
.login {
  width: 100%;
  height: 100%;
  background-color: skyblue;
  display: flex;
  background: url("../../assets/img/login-bg.svg");

  .panel {
    margin: auto;
  }

}
</style>