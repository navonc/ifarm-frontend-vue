<template>
    <div class="header flex-between">
        <div class="header-left flex-between">
            <div class="header-icon" @click="appStore.setAppStore('isCollapse', !isCollapse)">
                <el-icon size="22px" class="flex-center">
                    <component :is="isMobile ? 'menu' : (isCollapse ? 'expand' : 'fold')" />
                </el-icon>
            </div>

            <el-breadcrumb separator="/" class="breadcrumb">
                <el-breadcrumb-item
                    v-for="item in breadcrumbList"
                    :key="item.path"
                    :to="item.path === route.path ? '' : { path: item.path}"
                >
                    {{ item.meta.title || item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>

        </div>

        <div class="header-right flex-between">
            <!-- 消息 -->
            <div class="header-icon">
                <el-icon size="22px" class="flex-center">
                    <component is="Message" />
                </el-icon>
            </div>

            <!-- 设置 -->
            <div class="header-icon">
                <el-icon size="22px" class="flex-center">
                    <component is="setting" />
                </el-icon>
            </div>

            <!-- 明暗模式 -->
            <div class="header-icon" @click="appStore.setAppStore('isDark', !appStore.isDark)">
                <el-icon size="22px" class="flex-center">
                    <component :is="isDark ? 'sunny' : 'moon'" />
                </el-icon>
            </div>


            <!-- 用户信息 -->
            <el-dropdown class="user-dropdown" @command="handleCommand" v-if="userInfo">
                <div class="user-info flex-center">
                    <el-avatar :size="30" :src="userInfo?.avatar" />
                    <span class="username">{{ userInfo?.username }}</span>
                    <el-icon class="dropdown-icon">
                        <ArrowDown />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="profile">
                            <el-icon>
                                <User />
                            </el-icon>
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item command="settings">
                            <el-icon>
                                <Setting />
                            </el-icon>
                            设置
                        </el-dropdown-item>
                        <el-dropdown-item divided command="logout">
                            <el-icon>
                                <SwitchButton />
                            </el-icon>
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>

<script setup>
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const appStore = useAppStore();
const userStore = useUserStore();

const { isCollapse, isMobile, isDark } = storeToRefs(appStore);
const { userInfo } = storeToRefs(userStore);

// 面包屑导航
const breadcrumbList = computed(() => {
    const matched = route.matched.filter(item => item.meta && item.meta.title)

    // 始终在前面添加首页
    const homeItem = {
        path: '/dashboard',
        meta: { title: '首页'},
        name: 'Dashboard',
    }

    // 如果当前页面就是首页，只显示首页
    if (route.path === '/dashboard' || route.path === '/') {
        return [homeItem]
    }

    // 其他页面在首页后面显示当前路径
    return [homeItem, ...matched]
})


// 处理用户下拉菜单命令
const handleCommand = async (command) => {
    switch (command) {
        case 'profile':
            router.push('/profile')
            break
        case 'settings':
            ElMessage.info('跳转到设置页面')
            break
        case 'logout':
            await handleLogout()
            break
    }
};

// 处理登出
const handleLogout = async () => {
    try {
        await userStore.logout()
        ElMessage.success('登出成功')
        router.push('/login')
    } catch (error) {
        console.log(error)
        ElMessage.error('登出失败')
    } finally {
        userStore.resetStore()
        router.push('/login')
    }
};


</script>

<style lang="scss" scoped>
.header {
    height: 100%;

    .header-left {

    }

    .header-right {

        .user-dropdown {

            .user-info {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                border-radius: 20px;
                cursor: pointer;
                transition: background-color 0.3s ease;
                &:hover {
                    background-color: var(--el-fill-color-light);
                }

                .username {
                font-size: 14px;
                    color: var(--el-text-color-primary);
                    font-weight: 500;
                }
                
                .dropdown-icon {
                    font-size: 12px;
                    color: var(--el-text-color-secondary);
                    transition: transform 0.3s ease;
                }
                
                &:hover .dropdown-icon {
                    transform: rotate(180deg);
                }
            }
        }

    }
}

.header-icon {
    cursor: pointer;
    padding: 5px;
    margin-right: 15px;

    &:hover {
        color: var(--el-color-primary);
        background-color: var(--el-bg-color-page);
    }
}

@media (max-width: 768px) { 

    .header {
        .header-left {
            .breadcrumb { 
                display: none;
            }
        }

        .header-right {
            gap: 12px;

            .user-info {
                .username {
                    display: none;
                }
            }
        }
    }

    .header-icon {
        margin-right: 0px;
    }
}

</style>
