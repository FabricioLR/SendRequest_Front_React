export enum ResponseTypes{
    "ADD_RESPONSE" = "@response/ADD_RESPONSE",
}

export interface Response{
    key: string
    value: string
}

export interface ResponseState{
    readonly data: Response[]
}