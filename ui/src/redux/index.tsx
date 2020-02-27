import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { appReducer, appState } from "./app";
import { combineReducers } from "redux";

export interface StoreState {
  app: appState;
}

export const reducers = combineReducers({
  app: appReducer
});
export const store = createStore(reducers, applyMiddleware(thunk));
export default store;
export * from "./app";
