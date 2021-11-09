import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authMeSlice from "./auth-reducer"
import initializeApp from "./app-reducer"
import toDoListSlice from "./todo-lists-reducer"
import tasksSlice from "./tasks-reducer"


const rootReducer = combineReducers({
    authMeSlice,
    initializeApp,
    toDoListSlice,
    tasksSlice
})

export const setupStore = () => {
    return configureStore({reducer: rootReducer})
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]