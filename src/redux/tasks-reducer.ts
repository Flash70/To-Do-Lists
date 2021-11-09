import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AppDispatch} from "./store"
import {IItemsTask, ITask} from "../interface"
import {tasksAPI} from "../api/tasks-api"
import {IEditTask, ResultCode} from "../api/api"


const initialState: ITask = {
    items: [],
    error: "",
    totalCount: 1,
}


const tasksSlice = createSlice({
    name: "authMeReducer",
    initialState,
    reducers: {
        getTask(state, action: PayloadAction<ITask>) {
            return action.payload
        },
        createTask (state, action: PayloadAction<IItemsTask>) {
            state.items.unshift(action.payload)
        },
        deleteTask(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
    }
})

const {getTask, createTask, deleteTask} = tasksSlice.actions


export const getTaskServer = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await tasksAPI.getTask(id)
        dispatch(getTask(res))
    } catch (error) {
        alert("Ошибка при запросе списка задач")
        console.error(error)
    }
}


export const createTaskServer = (id: string, title: string) => async (dispatch: AppDispatch) => {
    try {
        const {data} = await tasksAPI.setTask(id, title)
        dispatch(createTask(data.item))
    } catch (error) {
        alert("Ошибка при добавлении списка задач")
        console.error(error)
    }
}
export const editTaskServer = (todolistId: string,taskId: string, obj: IEditTask) => async (dispatch: AppDispatch) => {
    try {
        const res = await tasksAPI.editTask(todolistId, taskId, obj)
        if (res.resultCode === ResultCode.Success) {
            dispatch(getTaskServer(res.data.item.todoListId))
        }
    } catch (error) {
        alert("Ошибка при изменении списка задач")
        console.error(error)
    }
}

export const deleteTaskServer = (todolistId: string,taskId: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await tasksAPI.deleteTask(todolistId, taskId)
        if (res.resultCode === ResultCode.Success) {
            dispatch(deleteTask(taskId))
        }
    } catch (error) {
        alert("Ошибка при удалении списка задач")
        console.error(error)
    }
}


export default tasksSlice.reducer