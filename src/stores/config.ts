import { defineStore } from 'pinia'

// 存token
export const useConfigStore = defineStore('CONFIG', () => {
  const token = ref<string>(localStorage.getItem('TOKEN') || '')
  const setToken = (val: string): void => {
    token.value = val
    localStorage.setItem('TOKEN', val)
  }
  return { token, setToken }
})
