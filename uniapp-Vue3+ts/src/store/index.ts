import { createPinia } from 'pinia'
//引入持久化插件
import persist from 'pinia-plugin-persistedstate'
//创建pinia实例
const pinia = createPinia()
pinia.use(persist)
export default pinia

export * from './cont'