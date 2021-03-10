import { todoReducer } from "./todoReducer";
import { doingReducer } from "./doingReducer";
import { doneReducer } from "./doneReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({todoReducer, doingReducer, doneReducer});

export default allReducers;
