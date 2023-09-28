import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUserInfo, fetchUserMenu, fetchVerifyUser } from '@/service/module/login/actionLogin'

import { locationCache } from '@/utils/cache'
import { mapMenusToRouter } from '@/utils/mapMenus.ts'
import { LOGIN_TOKEN } from '@/global/constants'
import { useRouter } from 'vue-router'

export const loginStore = defineStore('login', () => {

  // router实例
  const router = useRouter()


// 获取用户菜单树
  async function getUserMenuTree(id: any) {
    const res = await fetchUserMenu(id)
    if (res.data) return res.data
  }


  // 用户信息
  const userInfo = {
    id: '',
    name: '',
    token: ''
  }

  // 用户菜单树
  let userMenuTree = ref([])//这个是菜单数据

  // 获取用户信息
  const getUserInfo = async (data: any) => {
    const res = await fetchUserInfo(data)
    if (res.data) {
      console.log(res.data)
      // 将用户信息和token保存到本地缓存
      locationCache.setCache('userInfo', res.data)
      locationCache.setCache(LOGIN_TOKEN, res.data.token)

      //根据id查询权限
      const userV = await fetchVerifyUser(res.data.id)

      // 获取用户菜单树
      userMenuTree.value = await getUserMenuTree(res.data.id)
      locationCache.setCache('userMenu', userMenuTree.value)

      // 获取匹配到的路由
      // 添加动态路由
      const menus = mapMenusToRouter(userMenuTree.value)
      menus.forEach(item => {
        router.addRoute('main', item)
      })

      // 跳转页面
      await router.push('/main')

    }
  }

  // 用户刷新加载路由
  async function loadLocalCacheAction() {
    const token = locationCache.getCache(LOGIN_TOKEN)
    const user = locationCache.getCache('userInfo')
    // 这里我从本地缓存拿的菜单数据
    const userTree = locationCache.getCache('userMenu')
    if (userInfo && token) {

      // 将用户信息保存到userInfo
      userInfo.id = user.id
      userInfo.name = user.name
      userInfo.token = token
      // 赋值
      // userMenuTree.value = userTree

      // 这个方法是从服务器拿数据
      userMenuTree.value = await getUserMenuTree(userInfo.id)

      // 添加动态路由
      const menus = mapMenusToRouter(userMenuTree.value)
      menus.forEach(item => {
        router.addRoute('main', item)
      })

    }
  }

  return { userInfo, userMenuTree, getUserInfo, loadLocalCacheAction }

})
