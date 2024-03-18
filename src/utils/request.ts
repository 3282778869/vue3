import axios from 'axios'
import { showMessage } from './status' // 引入状态码文件
import { useConfigStore } from '@/stores/config'
// import { errorMsg } from './message'

// 设置接口超时时间
axios.defaults.timeout = 30000
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL  // 自定义接口地址


//请求拦截
axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // 请求接口需要令牌时
    const { token } = storeToRefs(useConfigStore())
    config.headers['Authorization'] = 'Bearer ' + token.value

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    const { response } = error
    if (response) {
      showMessage(response.status) // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    } else {
      // errorMsg('网络连接异常,请稍后再试!')
    }
  }
)

// 封装 请求并导出
function request<T>(data: object): Promise<T> {
  return new Promise((resolve, reject) => {
    const promise = axios(data)
    //处理返回
    promise
      .then((res: any) => {
        resolve(res)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

export function get<T>(url: string, params?: object): Promise<T> {
  return request({ method: 'GET', url, params })
}

export function post<T>(url: string, data?: string): Promise<T> {
  return request({ method: 'POST', url, data })
}

export function put<T>(url: string, data?: string): Promise<T> {
  return request({ method: 'PUT', url, data })
}

export function del<T>(url: string, params?: object): Promise<T> {
  return request({ method: 'DELETE', url, params })
}

