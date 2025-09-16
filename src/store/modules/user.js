// 用户状态管理

import { defineStore } from "pinia";
import { login, logout } from "@/api/auth";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        userInfo: {},
        roles: [],
        permissions: [],
    }),
    getters: {
        getToken: (state) => state.token,
        getUserInfo: (state) => state.userInfo,
        getRoles: (state) => state.roles,
        getPermissions: (state) => state.permissions,
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setUserInfo(userInfo) {
            this.userInfo = userInfo
        },
        setRoles(roles) {
            this.roles = roles
        },
        setPermissions(permissions) {
            this.permissions = permissions
        },

    },
    persist: {
        key: 'user',
        storage: localStorage,
        paths: ['token', 'userInfo', 'roles', 'permissions'],
    }

})