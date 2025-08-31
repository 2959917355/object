import {computed,unref } from 'vue'
import {SYSTEM_WINDOW_INFO} from '@/utils/config.js'
import { MENU_BUTTON_RECT_INFO }from '@/utils/config.js'
//状态栏高度(px)
export const statusBarH = computed(()=>SYSTEM_WINDOW_INFO.statusBarHeight || 25)

//标题栏高度
export const titleBarH = computed(()=>{
	const {top,height} = MENU_BUTTON_RECT_INFO
	if(!top || !height) return 40
	//胶囊按钮与状态栏的间隙 * 2 + 自己的高度
	return (top - unref(statusBarH))*2 + height
})

//头部导航总高度
export const navBarH = computed(()=> unref(statusBarH) + unref(titleBarH))

//使用状态栏高度
export const useNavBarStyle = ()=>{
	const statusBarHeight = computed(()=>unref(statusBarH) +'px')
	const titleBarHeight = computed(()=>unref(titleBarH) + 'px')
	const headHeight = computed(()=>unref(navBarH) + 'px')
	return {statusBarHeight,titleBarHeight,headHeight}
}