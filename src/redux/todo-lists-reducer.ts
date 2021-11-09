import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IPostToDoLists, IToDo, ResultCode} from "../api/api"
import {AppDispatch} from "./store"
import {toDoAPI} from "../api/todo-lists-api"

interface IInitialToDo {
    lists: IToDo[]
    isAuth: boolean
}

const initialState: IInitialToDo = {
    lists: [],
    isAuth: false
}


const toDoListSlice = createSlice({
    name: "toDoListsReducer",
    initialState,
    reducers: {
        getToDoLists(state, action: PayloadAction<IToDo[]>) {
            state.lists = action.payload
            state.isAuth = true
        },
        setToDoList(state, action: PayloadAction<IToDo>) {
            state.isAuth = false
            state.lists.unshift(action.payload)
            state.isAuth = true
        },
        deleteToDoList(state, action: PayloadAction<string>) {
            state.isAuth = false
            state.lists = state.lists.filter((item) => item.id !== action.payload)
            state.isAuth = true
        },
    }
})

export const {getToDoLists, setToDoList, deleteToDoList} = toDoListSlice.actions


export const getToDoListsServer = () => async (dispatch: AppDispatch) => {
    try {
        const res = await toDoAPI.getToDoLists()
        dispatch(getToDoLists(res))
    } catch (error) {
        alert("Ошибка при запросе ToDo Lists");
        console.error(error);
    }
}
export const setNewToDoList = (obj: IPostToDoLists) => async (dispatch: AppDispatch) => {
    try {
        const res = await toDoAPI.setToDoList(obj)
        dispatch(setToDoList(res.data.item))
    } catch (error) {
        alert("Ошибка при добавлении ToDo Lists");
        console.error(error);
    }
}

export const deleteToDoListServer = (todolistId: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await toDoAPI.deleteToDoList(todolistId)
        if (res.resultCode === ResultCode.Success) {
            dispatch(deleteToDoList(todolistId))
        }
    } catch (error) {
        alert("Ошибка при удалении ToDo Lists");
        console.error(error);
    }
}
export const editToDoListServer = (todolistId: string, obj: IPostToDoLists) => async (dispatch: AppDispatch) => {
    try {
        const res = await toDoAPI.editToDoList(todolistId, obj)
        if (res.resultCode === ResultCode.Success) {
            dispatch(getToDoListsServer())
        }
    } catch (error) {
        alert("Ошибка при изменении ToDo Lists");
        console.error(error);
    }
}



export default toDoListSlice.reducer