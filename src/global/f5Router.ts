import { locationCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRouter } from '@/utils/mapMenus'


export default function call(router: any) {
  // 获取菜单树
  const menuTree = locationCache.getCache('userMenu')
  const token = locationCache.getCache(LOGIN_TOKEN)
  // console.log(LOGIN_TOKEN)

  if (token) {
    const menus = mapMenusToRouter(menuTree)
    menus.forEach(item => {
      router.addRoute('main', item)
    })
  }
}
