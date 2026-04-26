<script setup lang="ts"></script>

<template>
  <!-- 错误消息配置位置和样式 -->
  <UApp :toaster="{ position: 'top-center', expand: false }">
    <!-- 默认使用 default.vue 布局 -->
    <NuxtLayout>
      <!-- 默认加载 index.vue -->
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style scoped></style>
