import {ref, watchEffect} from 'vue'
import {storeToRefs} from 'pinia'
import {useThemeStore} from '@/stores/theme'

const store = useThemeStore()
const {theme} = storeToRefs(store)

const themeColor = ref<number>(theme.value)

watchEffect((): void => {
    const themeClass = ref<string>('')
    if (themeColor.value == 1) {
        themeClass.value = 'dark'
    } else if (themeColor.value == 2) {
        themeClass.value = ''
    }
    document.documentElement.dataset.theme = themeClass.value
})

export function useTheme() {
    return {themeColor}
}