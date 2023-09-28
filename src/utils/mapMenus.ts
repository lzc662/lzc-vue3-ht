import type { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import { locationCache } from '@/utils/cache'

// 加载本地路由
function localRoute() {
  // 创建动态路由
  const localRouters: RouteRecordRaw[] = []

  // 获取main中所有router文件
  // require.context()  //webpack中获取方式
  const files = import.meta.glob('@/router/main/**/*.ts', { eager: true })  // vite中获取

  // 遍历本地路由 将路由存入 localRouters
  for (const file in files) {
    const module = files[file]
    localRouters.push(module.default)
  }
  return localRouters
}

// 声明首个路由
export let firstMenu: any = null
export const firstMenuId: any = ref()


// 根据服务器返回的路由匹配本地路由
export function mapMenusToRouter(userMenuTree: any) {
  const routes: RouteRecordRaw[] = []

  // 获取本地路由
  const localRouters = localRoute()

  // 遍历服务器传来的路配由
  for (const menu in userMenuTree) {
    if (userMenuTree[menu].children) {
      for (const subMenu in userMenuTree[menu].children) {
        // 匹配本地路由
        const item = localRouters.find(element => element.path === userMenuTree[menu].children[subMenu].url)
        if (item) routes.push(item)
        if (item && firstMenu == null) {
          firstMenu = item
          firstMenuId.value = userMenuTree[menu].id
        }
      }
    }
  }
  return routes
}

// 面包屑
// 声明路由对象
export function breadcrumbs(leftPath: string) {
  const mbx = {
    title: '',
    titleUrl: '',
    name: ''
  }
  const userMenu = locationCache.getCache('userMenu')
  for (const menu in userMenu) {
    for (const subMenu in userMenu[menu].children) {
      const item = userMenu[menu].children[subMenu]
      if (item.url === leftPath) {
        mbx.title = userMenu[menu].name
        mbx.titleUrl = userMenu[menu].children[0].url
        mbx.name = item.name

      }
    }
  }
  return mbx
}

// 递归路由
// routers:服务传来的路由
// 获取本地路由
// const localRouters = localRoute()
//
// export function recursionRouter(routers: any) {
// // 定义子路由
//   const rs = []
//   console.log(routers)
//   for (const menu in routers) {
//     if (routers[menu].children) {
//       for (const subMenu in routers[menu].children) {
//         if (routers[menu].children[subMenu].children.length > 0) {
//           recursionRouter(routers[menu].children[subMenu].children)
//         }
//         console.log(1, routers[menu].children[subMenu])
//         rs.push(routers[menu].children[subMenu])
//       }
//     }
//   }
// console.log(rs)
// 判断子路由中是否包含子路由
// 如果含有二级路由则执行递归操作
// if (routers[menu].children.children.length > 0) {
//   recursionRouter(routers[menu].children)
//   console.log(routers[menu].children)
// }

// 遍历一级路由
// 匹配本地路由
// for (const subMenu in routers[menu].children) {
//   const route = localRouters.find(element => element.path === routers[menu].children[subMenu].url)
//   if (route) rs.push(route)
// }
// }
// 遍历一级路由

// console.log(rs)
// 返回所有子路由
//   return rs
// }
