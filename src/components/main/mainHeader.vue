<template>
  <div class='mainHeader'>
    <el-menu
      index='1'
      class='el-menu-demo'
      mode='horizontal'
      :ellipsis='false'
    >

      <el-menu-item
        index='1-1'
        @click='leftIsShow'
      >
        <el-icon class='icon'>
          <component :is='isLeftCollapse ? "Fold" : "Expand" '></component>
        </el-icon>
      </el-menu-item>

      <!--      面包屑-->
      <div class='breadcrumb'>
        <mainBreadcrumbs />
      </div>

      <!--      右侧菜单-->
      <div class='flex-grow' />
      <el-menu-item
        index='1-2'
      >
        <el-icon class='icon'>
          <Bell />
        </el-icon>
      </el-menu-item>
      <el-menu-item
        index='1-3'
      >
        <el-icon class='icon'>
          <ChatLineRound />
        </el-icon>
      </el-menu-item>
      <el-sub-menu
        index='2'
      >
        <template #title>
          <img class='userImg' src='../../assets/img/QQ图片20230907124419.jpg' alt=''>
          {{ userName }}
        </template>
        <el-menu-item @click='exitUser' class='littleText' index='2-1'>退出登陆</el-menu-item>
        <el-menu-item class='littleText' index='2-2'>个人信息</el-menu-item>
        <el-menu-item class='littleText' index='2-3'>修改密码</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang='ts'>
import mainBreadcrumbs from '@/components/main/mainBreadcrumbs.vue'
import { locationCache } from '@/utils/cache'
import { mainStore } from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

// 获取用户姓名
const userName = locationCache.getCache('account')

// 获取折叠状态
const main = mainStore()
const { isLeftCollapse } = storeToRefs(main)

// // 折叠、显示事件
const leftIsShow = () => {
  isLeftCollapse.value = !isLeftCollapse.value
}

// 退出登陆
function exitUser() {
  router.push('/login')
  locationCache.clearCache()
}
</script>

<style scoped lang='less'>
.mainHeader {
  width: 100%;
  height: 100%;
}

.el-menu-demo {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  

  .littleText {
    font-size: 12px;
  }

  .icon {
    font-size: 22px;
  }

  .userImg {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .flex-grow {
    flex-grow: 1;
  }
}
</style>