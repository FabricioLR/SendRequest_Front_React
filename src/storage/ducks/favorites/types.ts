import { Header } from "../header/types";
import { Body } from "../body/types";

export enum FavoriteTypes{
    "SAVE" = "@favorites/SAVE",
}

export interface Favorite{
    metodo: string
    url: string
    body: Body[]
    headers: Header[]
    id: string
}

export interface FavoriteState{
    readonly data: Favorite[]
}