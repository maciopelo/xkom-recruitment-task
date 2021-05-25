import { combineReducers } from "redux"
import { userReducer } from "./userReducer"
import { hallReducer } from "./hallReducer"


const reducers = combineReducers({
    user: userReducer,
    hall: hallReducer,
})

export default reducers;