// 文章接口所需要类型

// 获取文章分组接口所需参数
export interface getGroupType {
    code: string,
}

// 获取文章列表所需参数
export interface getArticleType {
    pageIndex: number,
    pageSize:number,
    group_id:string
}
