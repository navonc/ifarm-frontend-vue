<template>
    <div class="aside">
        <div class="aside-header flex-center">
            <img src="@/assets/vue.svg" alt="">
            <h3 v-if="!isCollapse">后台管理系统</h3>
        </div>

        <div class="aside-menu">
            <el-scrollbar>
                <el-menu :default-active="activeMenu" :collapse="isCollapse" :collapse-transition="false" :unique-opened="true"
                    router mode="vertical">
                    <MenuItem :menu-list="menuroutes" />
                </el-menu>
            </el-scrollbar>
        </div>
    </div>

</template>

<script setup>
import { useAppStore } from '@/store/modules/app';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import MenuItem from '../Menu/MenuItem.vue';
import { computed } from 'vue';

const route = useRoute()
const router = useRouter()

const activeMenu = computed(() => route.path)

const appStore = useAppStore()

const { isCollapse } = storeToRefs(appStore)

// 动态菜单数据
const menuroutes = computed(() => {
    // 获取所有的路由
    const allRoutes = router.getRoutes()

    // 过滤出需要在菜单中显示的路由（有meta.title且不是隐藏的）
    const routes = allRoutes.filter(route => route.meta && route.meta.title && !route.meta.hidden && route.path !== '/')

    // 构建菜单树结构
    return buildMenuTree(routes)
    
})

// 构建菜单树结构
const buildMenuTree = (routes) => {
    const menuTree = []
    const routeMap = new Map()

    // 先将所有路由放入map中
    routes.forEach(route => {
        routeMap.set(route.path, { ...route, children: [] })
    })

    // 构建树结构
    routes.forEach(route => {
        const menuItem = routeMap.get(route.path)

        // 判断是否为子路由（路径包含多个/且不是根路径）
        const pathSegments = route.path.split('/').filter(Boolean)

        if (pathSegments.length > 1) {
            // 这是一个子路由，找到它的父路由
            const parentPath = '/' + pathSegments[0]
            const parent = routeMap.get(parentPath)

            if (parent) {
                parent.children.push(menuItem)
            }
        } else {
            // 这是一个顶级路由
            menuTree.push(menuItem)
        }
    })

    return menuTree
}

</script>

<style lang="scss" scoped>
.aside {
    width: 100%;
    height: 100%;
    .aside-header {
        height: 60px;
        border-bottom: 1px solid var(--el-border-color);
    }

    .aside-menu {
        height: calc(100% - 60px);


        .el-menu { 
            border: none;
        }
    }
}
</style>