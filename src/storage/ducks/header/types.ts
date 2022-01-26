export enum HeaderTypes{
    "ADD_KEY" = "@header/ADD_KEY",
    "REMOVE_KEY" = "@header/REMOVE_KEY"
}

export interface Header{
    key: string
    value: string
}

export interface HeaderState{
    readonly data: Header[]
}