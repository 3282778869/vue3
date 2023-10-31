<script lang="ts" setup>
import {useThemeStore} from '@/stores/theme'
import {useTheme} from "@/utils/theme";

const store = useThemeStore()

const {themeColor} = useTheme()

const cutTheme = (val: boolean) => {
  if (val) {
    themeColor.value = 2
    store.alterTheme(1)
  } else {
    themeColor.value = 1
    store.alterTheme(2)
  }
}
</script>

<template>
  <div class="about">
    <h1>这是about页面</h1>
    <div class="card">
      <div>{{ themeColor == 1 ? '第一种颜色' : '第二种颜色' }}</div>
    </div>
    <a-switch checked-color="#F53F3F" unchecked-color="#14C9C9" @change="cutTheme"/>
  </div>
</template>

<style lang="less" scoped>
.about {
  .card {
    width: 120px;
    height: 120px;
    border: 1px solid #000;
    margin-left: 50px;
    background: var(--bg-color);
  }
}
</style>
