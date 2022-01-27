import { Reducer } from "redux"
import { HeaderTypes, HeaderState} from "./types"

const INITIAL_STATE: HeaderState = {
    data: []
}

const reducer: Reducer<HeaderState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HeaderTypes.ADD_KEY:
            return { ...state, data: [...state.data, { key: action.key, value: action.value }] }
        case HeaderTypes.REMOVE_KEY:
            return { ...state, data: [...state.data.slice(0, action.index), ...state.data.slice(action.index + 1)] }
        case HeaderTypes.CHANGE_KEYS:
            return { ...state, data: [action.data] }
        default:
            return state
    }
}

export default reducer