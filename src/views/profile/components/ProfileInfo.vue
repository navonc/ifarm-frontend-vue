<template>
    <el-card class="profile-card">
        <template #header>
            <span>个人信息</span>
        </template>
        <div class="profile-avatar flex-center">
            <el-avatar :size="150" :src="userInfo?.avatar" />
        </div>
        <template v-for="item in userInfoList" :key="item">
            <div v-if="item.type && item.icon === 'Monitor'" class="profile-info flex-between">
                <div class="info-title flex-between">
                    <el-icon size="20px">
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.title }}:</span>
                </div>
                <div class="info-content"><el-tag size="large" :type="item.type">{{ item.value }}</el-tag></div>
            </div>


            <div v-else-if="item.icon && item.icon === 'lock'" class="profile-info flex-between">
                <div class="info-title flex-between">
                    <el-icon size="20px">
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.title }}:</span>
                </div>
                <div class="info-content"><el-button text bg type="danger">{{ item.value }}</el-button></div>
            </div>


            <div v-else class="profile-info flex-between">
                <div class="info-title flex-between">
                    <el-icon size="20px">
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.title }}:</span>
                </div>
                <div class="info-content">{{ item.value }}</div>
            </div>
        </template>
    </el-card>

</template>

<script setup>
import { useUserStore } from '@/store/modules/user';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore); 

const userInfoList = computed(() => {
    return [
        {
            icon: 'user',
            title: '用户名',
            value: userInfo.value.username || '未登录',
        },
        {
            icon: 'Monitor',
            title: '用户状态',
            value: userInfo.value.status ? '正常' : '禁用',
            type: userInfo.value.status ? 'success' : 'danger',
        },
        {
            icon: 'lock',
            title: '用户角色',
            value: getUserRoleName() || '未设置'
        },
        {
            icon: 'phone',
            title: '联系电话',
            value: userInfo.value.phone || '无',
        },
        {
            icon: 'message',
            title: '个人邮箱',
            value: userInfo.value.email || '无',
        },
        {
            icon: 'timer',
            title: '最后登入',
            value: userInfo.value.lastLoginTime || '无',
        }
    ]
})

const getUserRoleName = () => {
    const roles = userStore.getRoles;
    console.log(roles);
    const role = roles[0]
    switch (role) {
        case 'SUPER_ADMIN':
            return '超级管理员'
        case 'ADMIN':
            return '系统管理员'
        case 'FARM_ADMIN':
            return '农户管理员'
        default:
            return '普通用户'
    }
}




</script>

<style lang="scss" scoped>
.profile-info {
    padding: 10px;
    margin-top: 10px;
    border-bottom: 1px solid var(--el-border-color);

    .info-title {
        font-size: 16px;
        font-weight: bold;

        span {
            margin-left: 10px;
            white-space: nowrap;
        }

    }

    .info-content {
        // 溢出宽度显示省略号
        white-space: nowrap;
    }
}
</style>