<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter'
import { useConfigStore } from '@/stores/config'

const userStore = useCounterStore()


const { token } = storeToRefs(useConfigStore())

const { setToken } = useConfigStore()

const calculate = () => {
  userStore.increment()
  setToken(String(userStore.count))
}

</script>

<template>
  这是home 页面
  <h1 class="number">{{ userStore.count }}</h1>
  <h1 class="number">{{ token }}</h1>
  <el-button type="primary" @click="calculate()">计算count</el-button>
</template>

<style lang="less" scoped>
.number {
  color: blue;
  margin-left: 50px;
}
</style>
