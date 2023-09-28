import { loginStore } from '@/stores/login/login'
import { createPinia } from 'pinia'
import { useRouter } from 'vue-router'

const pinia = createPinia()
import type { App } from 'vue'

async function stroe(app: App) {
  app.use(pinia)
  const { loadLocalCacheAction } = loginStore() //此时代表store已有数据
  await loadLocalCacheAction()
}

export default stroe
