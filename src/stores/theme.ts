import {defineStore} from 'pinia'


export const useThemeStore = defineStore('theme', () => {
    const theme = ref<number>(1)
    const alterTheme = (val: number): void => {
        theme.value = val
    }
    return {theme, alterTheme}
})
