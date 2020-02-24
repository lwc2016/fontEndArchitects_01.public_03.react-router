import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./reducers/user";
import thunk from "redux-thunk";
import logger from "redux-logger";

export default createStore(combineReducers({
    user: userReducer
}), applyMiddleware(logger, thunk))