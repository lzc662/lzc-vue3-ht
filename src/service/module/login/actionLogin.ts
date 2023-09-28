import lzcRequest from '@/service'
import { LOGIN_TOKEN } from '@/global/constants'
import { locationCache } from '@/utils/cache'

// 获取登陆信息
export function fetchUserInfo(data: any) {
  // 清除token,防止登陆报错
  locationCache.removeCache(LOGIN_TOKEN)
  return lzcRequest.post({
    url: '/login',
    data: data
  })
}

// 查询用户登陆信息
export function fetchVerifyUser(id: number | string) {
  return lzcRequest.get({
    url: `/users/${id}`
  })
}

//获取角色菜单树
export function fetchUserMenu(id: number) {
  return lzcRequest.get({
    url: `/role/${id}/menu`
  })
}