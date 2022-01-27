import { Reducer } from "redux"
import { BodyTypes, BodyState} from "./types"

const INITIAL_STATE: BodyState = {
    data: []
}

const reducer: Reducer<BodyState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BodyTypes.ADD_KEY:
            return { ...state, data: [...state.data, { key: action.key, value: action.value }] }
        case BodyTypes.REMOVE_KEY:
            return { ...state, data: [...state.data.slice(0, action.index), ...state.data.slice(action.index + 1)] }
        case BodyTypes.CHANGE_KEYS:
            return { ...state, data: action.data }
        default:
            return state
    }
}

export default reducer