import { get } from '@/utils/request'

import type {getGroupType , getArticleType} from "@/types/test";

export const getGroup = <T>(params: getGroupType): Promise<T> => {
    return get("/api/articleGroup",params)
}
export const getArticle = <T>(params: getArticleType): Promise<T> => {
    return get("/api/getArticle",params)
}