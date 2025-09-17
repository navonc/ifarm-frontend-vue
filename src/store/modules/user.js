// 用户状态管理

import { defineStore } from "pinia";
import { logout,login  } from "@/api/auth";
import { getUserInfo } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: null,
    userInfo: null,
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
      this.token = token;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    setRoles(roles) {
      this.roles = roles;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    resetState() {
      this.token = null;
      this.userInfo = null;
      this.roles = [];
      this.permissions = [];
    },
    async login(data) {
        try {
            const res = await login(data)
            this.token = res.data.token
            this.userInfo = res.data.userInfo
            this.roles = res.data.roles
            this.permissions = res.data.permissions
        } catch (error) {
            console.log(error);
        }
    },
    async logout() {
      try {
        await logout();
      } catch (error) {
        console.log(error);
      } finally {
        this.resetState();
      }
    },
    async fetchUserInfo() {
        try {
            const res = await getUserInfo()
            this.userInfo = res.data
            this.roles = res.data.roles
            this.permissions = res.data.permissions
        } catch (error) {
            console.log(error)
        }
    }
  },
  persist: {
    key: "user",
    storage: localStorage,
    paths: ["token", "userInfo", "roles", "permissions"],
  },
});