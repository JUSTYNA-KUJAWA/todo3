/* eslint-disable linebreak-style */
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { initialState } from "./initialState";
import { reducer as tasksReducer } from "./tasksRedux";
import { reducer as usersReducer } from "./usersRedux";

// define reducers
const reducers = {
  tasks: tasksReducer,
  users: usersReducer,
};

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
