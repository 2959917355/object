import { defineStore } from "pinia";
import { ref } from "vue";

export const useContStore = defineStore("cont", () => {
    //state
    const num = ref(0)

    function add(n: number) {
        num.value += n
    }

    return {
        num,
        add
    }


}, {
    // 网页端配置
    // persist: true,
    // 小程序端配置
    persist: {
        storage: {
            getItem(key) {
                return uni.getStorageSync(key)
            },
            setItem(key, value) {
                uni.setStorageSync(key, value)
            },
        },
    },
})