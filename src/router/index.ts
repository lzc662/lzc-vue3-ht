import { createRouter, createWebHistory } from 'vue-router'
import type { RouterOptions } from 'vue-router'
import { locationCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import call from '@/global/f5Router.ts'
import { firstMenu, firstMenuId } from '@/utils/mapMenus'

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory(), // 这个不是必须传

    routes: [
      {
        path: '/',
        redirect: '/login'
      },
      {
        path: '/login',
        component: () => import('@/views/login/login.vue')
      },
      {
        path: '/main',
        name: 'main',
        component: () => import('@/views/main/main.vue')
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/404/404.vue'),
        hidden: true
      }
    ]
  } as RouterOptions
)
call(router)

router.beforeEach((to, from) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = locationCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
  if (to.path === '/main' && token) {
    return firstMenu.path
  }
})


export default router
