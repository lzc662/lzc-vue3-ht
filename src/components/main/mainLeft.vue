<template>
  <div class='mainLeft'>
    <div class='title'>
      <img class='titleImg' src='../../assets/img/logo.svg' alt=''>
      <h2 v-show='isLeftCollapse' class='text'>后台管理系统</h2>
    </div>
    <div class='menu'>
      <el-menu
        class='el-menu-vertical-demo'
        background-color='#051c36'
        active-text-color='#fff'
        text-color='#bce0ff'
        :unique-opened=true
        :default-active='firstActive + ""'
        mode='vertical'
        :collapse='!isLeftCollapse'
      >
        <template v-for='(item) in userMenuTree' :key='item.id'>
          <el-sub-menu
            class='el-sub-menu'
            :index='item.id + ""'
          >
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for='(iten) in item.children' :key='iten.id'>
              <el-menu-item :index='item.id+""' @click='itemClick(iten)'>{{ iten.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>

      </el-menu>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { mainStore } from '@/stores/main/main'
import { loginStore } from '@/stores/login/login.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { locationCache } from '@/utils/cache'

const router = useRouter()
const main = mainStore()
const login = loginStore()

// 默认展开id
const userMenu = locationCache.getCache('userMenu')
const firstActive = ref(userMenu[0].id)

// 获取折叠状态
const { isLeftCollapse } = storeToRefs(main)

// 获取用户菜单树
let { userMenuTree } = storeToRefs(login)


// 监听item点击
function itemClick(item) {
  router.push(item.url)
  for (const menu in userMenuTree.value) {
    if (userMenuTree.value[menu].children) {
      for (const subMenu in userMenuTree.value[menu].children) {
        if (item.url === userMenuTree.value[menu].children[subMenu].url) {
          locationCache.setCache('mainLeftId', userMenuTree.value[menu].id)
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
.title {
  display: flex;
  align-items: center;
  padding: 15px 0 15px 15px;

  .titleImg {
    height: 30px;
  }

  .text {
    margin-left: 10px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
  }
}

.menu {
  color: #fff;

  .el-menu-vertical-demo, el-sub-menu {


    .el-menu-item {
      background: #060a17;
    }

    .el-menu-item:hover, .el-sub-menu:hover {
      background-color: #476a9d;
      color: #fff;
    }
  }
}
</style>