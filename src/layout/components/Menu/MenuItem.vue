<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 有子菜单情况 -->
        <el-sub-menu v-if="item.children?.length" :index="item.path">
            <template #title>
                <el-icon v-if="item.meta.icon">
                    <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <MenuItem :menu-list="item.children" />
        </el-sub-menu>

        <!-- 没有子菜单 -->
        <el-menu-item v-else :index="item.path">
            <el-icon v-if="item.meta.icon">
                <component :is="item.meta.icon" />
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>

    </template>
</template>

<script setup>
defineProps({
    menuList: {
        type: Array,
        default: () => []
    }
})


</script>

<style lang="scss" scoped>

</style>