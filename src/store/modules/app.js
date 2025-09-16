// 全局状态管理器

import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
    state: () => ({
        // 菜单是否折叠
        isCollapse: false,
        // 是否黑暗模式
        isDark: false,
        // 是否移动端
        isMobile: false,
    }),
    getters: {},
    actions: {
        setAppStore(...arg) {
            this.$patch({[arg[0]]: arg[1]})
        }
    },
    persist: {
        key: 'app',
        storage: localStorage,
        paths: ['isCollapse', 'isDark', 'isMobile'],
    }
})