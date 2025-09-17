<template>
    <el-card class="profile-card">
        <template #header>
            <div class="flex-between">
                <span>用户中心</span>
                <el-button :disabled="isFormEdit" type="primary" icon="edit" @click="handleEdit">编辑</el-button>
            </div>
        </template>
        <el-form :disabled="!isFormEdit" ref="formRef" :model="form" label-width="auto"
            :size="isMobile ? 'default' : 'large'">
            <!-- 用户名 -->
            <el-form-item prop="username" label="用户名:">
                <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="user" />
            </el-form-item>

            <!-- 性别 -->
            <el-form-item prop="gender" label="用户性别:">
                <el-select v-model="form.gender" placeholder="请选择性别">
                    <el-option label="未知性别" value="0"></el-option>
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                </el-select>
            </el-form-item>

            <!-- 电话 -->
            <el-form-item prop="phone" label="联系电话:">
                <el-input prefix-icon="phone" v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <!-- 邮箱 -->
            <el-form-item label="个人邮箱:" prop="email">
                <el-input prefix-icon="message" v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <!-- 创建时间 -->
            <el-form-item label="创建时间" prop="createTime">
                <el-input prefix-icon="timer" :value="userInfo?.createTime" :disabled="true" />
            </el-form-item>

            <!-- 最后登录时间 -->
            <el-form-item label="最后登录" prop="lastLoginTime">
                <el-input prefix-icon="timer" :value="userInfo?.lastLoginTime" :disabled="true" />
            </el-form-item>


        </el-form>
        <div class="form-btns" v-if="isFormEdit">
            <el-button icon="delete" @click="handleEdit">取消</el-button>
            <el-button icon="upload" type="primary" @click="handleSaveInfo">保存</el-button>
        </div>
    </el-card>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import { updateUserInfo } from '@/api/user';
import { ElMessage } from 'element-plus';
import router from '../../../router';

const appStore = useAppStore();
const userStore = useUserStore();

const isFormEdit = ref(false)

const handleEdit = () => { 
    isFormEdit.value = !isFormEdit.value
}

const { isMobile } = storeToRefs(appStore);
const { userInfo } = storeToRefs(userStore);

const formRef = ref(null);

const form = ref({
    username: '',
    phone: '',
    email: '',
    gender: '0',
})

onMounted(() => {
    // 初始化表单数据
    form.value.username = userInfo.value.username
    form.value.phone = userInfo.value.phone
    form.value.email = userInfo.value.email
    form.value.gender = `${userInfo.value.gender}`
})

const handleSaveInfo = async () => { 
    try {
        const res = await updateUserInfo(form.value)
        ElMessage.success("更新用户信息成功")
        isFormEdit.value = false
        router.push('/')
    } catch (error) { 
        console.log(error)
        ElMessage.error(error.message)
    }
}

</script>

<style lang="scss" scoped></style>