<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
const userStore = useCounterStore()
</script>

<template>
    这是home 页面
    <h1 class="number">{{ userStore.count }}</h1>
    <a-button type="primary" @click="userStore.increment()">计算count</a-button>
</template>

<style lang="less" scoped>
.number {
  color: blue;
  margin-left: 50px;
}
</style>
