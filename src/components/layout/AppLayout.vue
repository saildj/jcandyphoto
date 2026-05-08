<template>
  <div class="app-layout">
    <div class="mobile-menu-btn" @click="toggleSidebar">
      <el-icon v-if="!sidebarOpen"><Menu /></el-icon>
      <el-icon v-else><Close /></el-icon>
    </div>

    <aside class="app-sidebar" :class="{ 'sidebar-open': sidebarOpen }">
      <Sidebar />
    </aside>

    <div class="sidebar-overlay" v-if="sidebarOpen" @click="toggleSidebar"></div>

    <main class="app-main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, Close } from '@element-plus/icons-vue';
import Sidebar from './Sidebar.vue';

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const handleResize = () => {
  if (window.innerWidth > 768) {
    sidebarOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  position: relative;

  .mobile-menu-btn {
    display: none;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 1001;
    width: 44px;
    height: 44px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    .el-icon {
      font-size: 22px;
      color: #333;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  .app-sidebar {
    width: 280px;
    flex-shrink: 0;
    background-color: #fff;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    z-index: 999;
    transition: transform 0.3s ease;
  }

  .app-main-content {
    flex-grow: 1;
    margin-left: 280px;
    padding: 20px;
    background-color: var(--bg-secondary);
    min-height: 100vh;
    transition: margin-left 0.3s ease;
  }
}

@media (max-width: 768px) {
  .app-layout {
    .mobile-menu-btn {
      display: flex;
    }

    .sidebar-overlay {
      display: block;
    }

    .app-sidebar {
      transform: translateX(-100%);
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);

      &.sidebar-open {
        transform: translateX(0);
      }
    }

    .app-main-content {
      margin-left: 0;
      padding: 70px 16px 20px;
    }
  }
}
</style>
