import {request} from '@/utils/request'
import type {getGroupType , getArticleType} from "@/types/test";

export const getGroup = (params: getGroupType) => {
    return request({
        url: "api/articleGroup",
        method: "GET",
        params,
    });
}
export const getArticle = (params: getArticleType) => {
    return request({
        url: "api/getArticle",
        method: "GET",
        params,
    });
}