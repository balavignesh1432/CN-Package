import { todoReducer } from "./todoReducer";
import { doingReducer } from "./doingReducer";
import { doneReducer } from "./doneReducer";
import { loggedReducer } from "./loggedReducer";
import { roomReducer } from './roomReducer';
import { userReducer } from "./userReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({todoReducer, doingReducer, doneReducer, loggedReducer, roomReducer, userReducer});

export default allReducers;
