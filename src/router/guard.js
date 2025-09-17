// 路由守卫
import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'

// nprogress配置
nProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: true, // 是否显示加载ico
    trickle: true,  // 是否显示进度条
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3, // 初始化时的最小百分比

})

const whiteList = ['/login', '/404']

// 前置守卫
router.beforeEach(async (to, from, next) => { 
    nProgress.start()
    const userStore = useUserStore()

    const token = userStore.getToken

    console.log("token: " + token);
    
    if (token != null) { 
        // 1.1 如果要去登录页，直接跳转到首页
        if (to.path === '/login') {
            next({ path: '/' })
            nProgress.done()
        } else {
            // 1.2 检查是否已获取用户信息
            if (!userStore.getUserInfo) {
                try {
                    // 1.2.1 获取用户信息和权限
                    await userStore.fetchUserInfo()
                } catch (error) {
                    // 1.2.2 获取用户信息失败，清除token并跳转到登录页
                    await userStore.logout() // 清除token
                    ElMessage.error('登录已过期，请重新登录')
                    next(`/login?redirect=${to.path}`)
                    nProgress.done()
                    return
                }
            }

            // 1.3 检查权限
            if (to.meta && to.meta.roles && to.meta.roles.length > 0) {
                // 需要特定的角色才能访问
                const hasPermission = to.meta.roles.some(role => {
                    userStore.roles.includes(role)
                })

                if (hasPermission) {
                    next()
                } else { 
                    ElMessage.error('没有权限访问！')
                    next('/403')
                }
            } else { 
                // 不需要特定权限，直接放行
                next()
            }
        }
    } else {
        // 2. 无token的情况
        // 2.1 检查是否在白名单中
        if (whiteList.includes(to.path)) {
            next()
        } else {
            // 2.2 不在白名单中，重定向到登录页，并记录当前路径
            next(`/login?redirect=${to.path}`)
            nProgress.done()
        }
    }

})


// 后置守卫
router.afterEach((to, from) => { 
    // 设置页面标题
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '默认标题'
    }
    nProgress.done()
})


// 错误处理
router.onError((error) => { 
    nProgress.done()
    console.error('路由错误:', error)
    
    // 处理不同类型的路由错误
    if (error.message.includes('Failed to fetch dynamically imported module')) {
        ElMessage.error('页面加载失败，请刷新重试')
    } else {
        ElMessage.error('路由发生错误，请稍后再试')
    }
})