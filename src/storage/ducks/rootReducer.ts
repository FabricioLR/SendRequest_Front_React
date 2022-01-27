import { combineReducers } from "redux";

import body from "./body";
import header from "./header"
import response from "./response"
import favorites from "./favorites"

const rootReducer = combineReducers({
    body, header, response, favorites
})

export default rootReducer