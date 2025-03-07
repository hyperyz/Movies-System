import { applyMiddleware, legacy_createStore } from 'redux'
import { IRootState, rootReducer } from "./reducers/RootReducer";
import { thunk, ThunkMiddleware } from "redux-thunk";
import { logger } from "redux-logger";

export const store = legacy_createStore(rootReducer, undefined, applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger))