<script lang="ts" setup>
import { useThemeStore } from '@/stores/theme'
import { useTheme } from '@/utils/theme'
import { getArticle, getGroup } from '@/api/test'
import type { getArticleType, getGroupType } from '@/types/test'
import type { resultData } from '@/types/public'
import type { aboutType } from '@/types/about'

const store = useThemeStore()

const { themeColor } = useTheme()

const cutTheme = (val: boolean) => {
  if (val) {
    themeColor.value = 2
    store.alterTheme(1)
  } else {
    themeColor.value = 1
    store.alterTheme(2)
  }
}

const newList = ref<aboutType[]>([])

// 获取页面详情
const getData = async (code: string) => {
  // 请求 文字分组接口
  const groupData = reactive<getGroupType>({
    code: code
  })
  const { code: code1, data:data1 }: resultData = await getGroup(groupData)
  if (code1 === 200) {
    const articleData = reactive<getArticleType>({
      pageIndex: 1,
      pageSize: 5,
      groupId: data1.id
    })

    const { code: code2, data:data2 }: resultData = await getArticle(articleData)

    if (code2 === 200) {
      newList.value = data2.results
    }
  }
}

onMounted(() => {
  getData('NEW')
})


</script>

<template>
  <div class="about">
    <h1>这是about页面</h1>
    <div class="card">
      <div>{{ themeColor == 1 ? '第一种颜色' : '第二种颜色' }}</div>
    </div>
    <el-switch checked-color="#F53F3F" unchecked-color="#14C9C9"  />
    <ul>
      <li v-for="item in newList" :key="item.id">{{ item.title }}</li>
    </ul>
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
