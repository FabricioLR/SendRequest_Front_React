import { Reducer } from "redux"
import { FavoriteTypes, FavoriteState} from "./types"
import { v4 } from "uuid"

const INITIAL_STATE: FavoriteState = {
    data: []
}

const reducer: Reducer<FavoriteState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FavoriteTypes.SAVE:
            return { ...state, data: [...state.data, { id: v4(), metodo: action.metodo, body: action.body, headers: action.headers, url: action.url}] }
        default:
            return state
    }
}

export default reducer