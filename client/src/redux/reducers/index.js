import { todoReducer } from "./todoReducer";
import { doingReducer } from "./doingReducer";
import { doneReducer } from "./doneReducer";
import { loggedReducer } from "./loggedReducer";
import { roomReducer } from './roomReducer';
import {usernameReducer} from './usernameReducer';
import { userReducer } from "./userReducer";
import { roomUserReducer } from "./roomUserReducer";
import { waitUserReducer } from "./waitUserReducer";


import { combineReducers } from "redux";

const allReducers = combineReducers({todoReducer, doingReducer, doneReducer, loggedReducer, userReducer,roomUserReducer,waitUserReducer,roomReducer,usernameReducer});

export default allReducers;
