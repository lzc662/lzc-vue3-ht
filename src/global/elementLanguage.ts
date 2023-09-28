import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export function elementLanguage(app: App) {
  app.use(ElementPlus, {
    locale: zhCn
  })
}