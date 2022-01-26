import { combineReducers } from "redux";

import body from "./body";
import header from "./header"
import response from "./response"

const rootReducer = combineReducers({
    body, header, response
})

export default rootReducer