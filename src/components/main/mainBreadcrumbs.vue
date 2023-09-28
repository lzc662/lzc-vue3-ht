<template>
  <div class='mainBreadcrumbs'>
    <el-breadcrumb class='breadcrumbs' separator-icon='ArrowRight'>

      <el-breadcrumb-item :to='mbx.titleUrl'>{{ mbx.title }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ mbx.name }}</el-breadcrumb-item>

    </el-breadcrumb>
  </div>
</template>

<script setup lang='ts'>

import { useRoute } from 'vue-router'
import { breadcrumbs } from '@/utils/mapMenus'
import { computed } from 'vue'

const route = useRoute()

// 给面包屑传入当前地址
const mbx = computed(() => {
  return breadcrumbs(route.path)
})
</script>

<style scoped lang='less'>
.breadcrumbs {
  height: 100%;
  line-height: 60px;
}
</style>