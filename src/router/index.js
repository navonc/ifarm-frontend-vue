// 路由配置

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "仪表盘",
          icon: "user",
        },
      },
      {
        path: "/system",
        name: "System",
        meta: {
          title: "系统管理",
          icon: "setting",
        },
        redirect: "/system/user",
        children: [
          {
            path: "/system/user",
            name: "User",
            component: () => import("@/views/system/user/index.vue"),
            meta: {
              title: "用户管理",
              icon: "user",
            },
          },
          {
            path: "/system/role",
            name: "Role",
            component: () => import("@/views/system/role/index.vue"),
            meta: {
              title: "角色管理",
              icon: "user",
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
