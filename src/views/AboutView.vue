<script lang="ts" setup>
import { useThemeStore } from '@/stores/theme'
import { useTheme } from "@/utils/theme";
import { getArticle, getGroup } from "@/api/test";
import type { getArticleType, getGroupType } from "@/types/test";
import type { testType } from "@/types/public";
import type { aboutType } from "@/types/about";

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
    const res = await getGroup(groupData) as testType
    if (res.code == 200) {
        const articleData = reactive<getArticleType>({
            pageIndex: 1,
            pageSize: 5,
            group_id: res.data.id
        })
        const req = await getArticle(articleData) as testType
        if (req.code == 200) {
            newList.value = req.data.results
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
        <a-switch checked-color="#F53F3F" unchecked-color="#14C9C9" @change="cutTheme" />
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
