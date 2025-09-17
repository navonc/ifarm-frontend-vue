<template>
    <el-container class="layout-container">
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? (isMobile ? '0px' : '65px'): '200px'" class="layout-aside" :class="{ 'is-mobile': isMobile }">
            <Aside />
        </el-aside>

        <!-- 主体内容 -->
        <el-container>
            <!-- 头部菜单栏 -->
            <el-header class="layout-header">
                <Header />
            </el-header>

            <el-main class="layout-main">
                <Main />
            </el-main>

            <!-- 底部版权信息 -->
            <el-footer v-if="footer">
                <Footer />
            </el-footer>
        </el-container>

        <div class="mask-mobile" v-if="isMobile && !isCollapse" @click="appStore.setAppStore('isCollapse', true)"></div>
    </el-container>
</template>

<script setup>
import Aside from './components/Aside/index.vue'
import Header from './components/Header/index.vue'
import Main from './components/Main/index.vue'
import Footer from './components/Footer/index.vue'
import { useAppStore } from '../store/modules/app';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();

const { isMobile, isCollapse, footer } = storeToRefs(appStore);




</script>

<style lang="scss" scoped>
.layout-container {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: auto;
    background-color: var(--el-bg-color);
    
    .mask-mobile { 
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transition: opacity 0.3s ease;
    }

    .layout-aside {
        border-right: 1px solid var(--el-border-color);
        background-color: var(--el-bg-color);
    }

    .layout-aside.is-mobile {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1001;
    }

    .layout-main { 
        background-color: var(--el-bg-color-page);
    }

    .layout-header { 
        border-bottom: 1px solid var(--el-border-color);
        height: 60px;
    }


}
</style>