
// 公共接口返回类型限制
export interface returnData {
    message: string,
    code: number,
}

// 请求响应参数，包含data
export interface resultData<T = any> extends returnData {
    data?: T;
}
