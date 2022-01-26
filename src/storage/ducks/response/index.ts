import { Reducer } from "redux"
import { ResponseState, ResponseTypes} from "./types"

const INITIAL_STATE: ResponseState = {
    data: []
}

const reducer: Reducer<ResponseState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ResponseTypes.ADD_RESPONSE:
            return { data: action.data }
        default:
            return state
    }
}

export default reducer