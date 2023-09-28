<template>
  <div class='main'>
    <el-container class='el-container'>
      <!--      左侧栏-->
      <el-aside :width='isLeftCollapse === false ? "60px" :"210px" ' class='el-aside'>
        <mainLeft />
      </el-aside>

      <el-container class='el-bottom'>

        <!--        顶栏-->
        <el-header class='el-header'>
          <mainHeader></mainHeader>
        </el-header>

        <!--        入口-->
        <el-main class='el-main'>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang='ts'>
import mainleft from '@/components/main/mainLeft'
import mainHeader from '@/components/main/mainHeader.vue'
import { mainStore } from '@/stores/main/main'
import { storeToRefs } from 'pinia'

// 获取折叠状态
const main = mainStore()
const { isLeftCollapse } = storeToRefs(main)

</script>

<style scoped lang='less'>
.main {
  height: 100%;

  .el-container {
    height: 100%;

    //侧边栏样式
    .el-aside {
      overflow: hidden;
      background: #051c36;
      transition: width 0.3s ease;
    }


    .el-header {
      padding: 0;
    }

    .el-main {
      background-color: #f1f1f1;
    }
  }

}
</style>