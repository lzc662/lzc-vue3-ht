// 此文件需要传入一个 LOGIN_TOKEN 和 localCache
import { locationCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { BASE_URL, TIME_OUT } from './config'
import LZCRequest from './request'

const lzcRequest = new LZCRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestFailureFn: (config) => {
      const token = locationCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config

    }
  }

  // interceptors: {
  //   //   requestSuccessFn: (config) => {
  //   //     // 每一个请求都自动携带token
  //   //     const token = localCache.getCache(LOGIN_TOKEN)
  //   //     if (config.headers && token) {
  //   //       // 类型缩小
  //   //       config.headers.Authorization = 'Bearer ' + token
  //   //     }
  //   //     return config
  //   //   }
  //   // }
})

export default lzcRequest
