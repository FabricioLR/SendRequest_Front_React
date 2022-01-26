/*import { createStore, Store, applyMiddleware } from "redux";
import { BodyState } from "./ducks/body/types";
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";

export interface ApplicationState{
    body: BodyState
}

const sagaMiddleware = createSagaMiddleware()

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store */
import { createStore, Store } from "redux";
import { BodyState } from "./ducks/body/types";

import rootReducer from "./ducks/rootReducer";

export interface ApplicationState{
    body: BodyState
}

const store: Store<ApplicationState> = createStore(rootReducer)

export default store