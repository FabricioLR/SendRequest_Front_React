export enum BodyTypes{
    "ADD_KEY" = "@body/ADD_KEY",
    "REMOVE_KEY" = "@body/REMOVE_KEY",
    "CHANGE_KEYS" = "@body/CHANGE_KEYS"
}

export interface Body{
    key: string
    value: string
}

export interface BodyState{
    readonly data: Body[]
}