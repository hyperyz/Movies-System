export interface IResponseError {
    err: string
    data: null
}

export interface IResponseData<T> {
    err: ""
    data: T
}

export interface IResponsePageData<T> {
    err: ""
    total: number
    data: T[]
}

export interface ISearchResult {
    page?: number
    limit?: number
    key?: string
}

export enum SwitchType {
    isHot = "isHot",
    isComing = "isComing",
    isClassic = "isClassic",
}