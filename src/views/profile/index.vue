<template>
    <div class="profile">
        <!-- 个人信息卡片 -->
        <div class="profile-content">
            <el-row :gutter="10">
                <!-- 左侧头像 -->
                <el-col :xs="24" :sm="24" :md="8" :lg="6">
                    <ProfileInfo :user-info-list="userInfoList" />
                </el-col>

                <!-- 右侧详细信息 -->
                <el-col :xs="24" :sm="24" :md="16" :lg="18">
                    <ProfileEdit />
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import ProfileInfo from './components/ProfileInfo.vue';
import ProfileEdit from './components/ProfileEdit.vue';

</script>

<style lang="scss" scoped>
.profile {
    .profile-content {

        .profile-card {
            .profile-avatar {
                cursor: pointer;
                margin-bottom: 20px;
                .el-avatar {
                    border: 2px solid var(--el-border-color); 
                }

                &:hover {
                    opacity: 0.8;
                    .el-avatar {
                        border: 2px solid var(--el-color-primary);
                    }
                }
            }


            .profile-form {
                display: grid;
                grid-template-columns: repeat(2, 1fr);

                
            }
        }


    }
}

.el-card {
    margin-bottom: 20px;
}

:deep(.el-card__header) {
    padding: 10px;
}
</style>