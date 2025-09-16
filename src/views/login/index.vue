<template>
  <div class="login-container flex-center">
    <div class="login-bg">
      <div class="bg-shape bg-shape-1"></div>
      <div class="bg-shape bg-shape-2"></div>
      <div class="bg-shape bg-shape-3"></div>
    </div>

    <div class="login-form-box">
      <div class="login-form">
        <div class="form-header">
          <h1 class="login-title">智慧农场后台管理系统</h1>
          <p class="login-subtitle">欢迎登入后台管理系统</p>
        </div>

        <!-- 登入表单 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          size="large"
          class="form-content"
          :rules="loginRules"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名/邮箱/手机号码"
              prefix-icon="user"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              prefix-icon="lock"
              type="password"
            />
          </el-form-item>

          <!-- 记住登入 -->
          <el-form-item>
            <div class="login-options">
              <el-checkbox v-model="loginForm.rememberme"
                >记住我</el-checkbox
              >
              <el-link type="primary" underline="never">忘记密码</el-link>
            </div>
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-btn"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
            <p class="copyright">
                © 2025 EduLink教育链. All rights reserved.
            </p>
        </div> 
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from "@/api/auth";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref(null);

const loginForm = ref({
  username: "",
  password: "",
  rememberme: false
});

const loginRules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// 初始化记住我用户名和密码
onMounted(() => {
  // 从本地存储中获取用户名和密码
  const username = localStorage.getItem("login_save_username")
  const password = localStorage.getItem("login_save_password")

  // 如果存在用户名和密码，填充到表单中
  if (username && password) {
    loginForm.value.username = username
    loginForm.value.password = password
    loginForm.value.rememberme = true
  }
})

const handleLogin = async () => { 
    try {
        const data = await login({
            username: loginForm.value.username,
            password: loginForm.value.password
        })
        
        
        // 登入成功保存信息
        userStore.setToken(data.token)
        userStore.setUserInfo(data.userInfo)
        userStore.setRoles(data.roles)
        userStore.setPermissions(data.permissions)

        if (loginForm.value.rememberme) {
            localStorage.setItem("login_save_username", loginForm.value.username)
            localStorage.setItem("login_save_password", loginForm.value.password)
        } else {
            localStorage.removeItem("login_save_username")
            localStorage.removeItem("login_save_password")
        }

        ElMessage.success("登录成功")
        router.push("/home")
    } catch (error) { 
        console.log(error)
        router.push("/login")
    }
};

</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #f6ffed 0%, #d9f7be 100%);
  overflow: hidden;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(82, 196, 26, 0.1);
  animation: float 6s ease-in-out infinite;

  &.bg-shape-1 {
    width: 200px;
    height: 200px;
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  &.bg-shape-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }

  &.bg-shape-3 {
    width: 100px;
    height: 100px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.login-form-box {
  position: relative;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  z-index: 2;
}

.login-form {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  .form-header {
    text-align: center;
    margin-bottom: 20px;

    .login-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--el-color-primary);
      margin: 0 0 8px 0;
    }

    .login-subtitle {
      font-size: 14px;
      color: var(--el-text-color-secondary);
      margin: 0;
    }
  }

  .form-content {

    .login-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .login-btn {
      width: 100%;
      height: 38px;
      font-size: 16px;
      font-weight: 500;
    }
  }
}

.login-footer {
  text-align: center;
  margin-top: 32px;

  .copyright {
    font-size: 12px;
    color: var(--el-text-color-placeholder);
    margin: 0;
  }
}

// 移动端适配
@media (max-width: 768px) {
  .login-form-box {
    width: 100%;
    padding: 20px;
  }

  .login-form {
    padding: 24px;
  }

  .form-header {
    margin-bottom: 24px;

    .form-title {
      font-size: 24px;
    }

    .form-subtitle {
      font-size: 13px;
    }
  }
}
</style>
