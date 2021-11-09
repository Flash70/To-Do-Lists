import axios from "axios"
import {IItemsTask} from "../interface"


export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "359e08de-0de3-4149-ba0c-09a519e98f6a"},
    baseURL: "https://social-network.samuraijs.com/api/1.1/"
});


export enum ResultCode {
    Success = 0,
    Error = 1,
    captcha = 10
}

export interface ILogin<D = {}, RS = ResultCode> {
    data: D
    messages: Array<string>
    resultCode: RS
}

export interface IAuthMeAPI {
    id: number | null
    email: string | null
    login: string | null
}

export interface ILoginMeResponse {
    userId: number | null
}

export interface IToDo {
    id: string
    title: string
    addedDate: string
    order: number
}


export interface IPostToDoLists {
    title: string
}


export interface IResponseToDoList<D = { item: IToDo }, RS = ResultCode> {
    resultCode: RS
    messages: string[]
    data: D
}

export interface IResponseTask<D = { item: IItemsTask }, RS = ResultCode> {
    data: D
    resultCode: RS
    messages: string[]
    fieldsErrors: string[]
}

export interface IEditTask {
    title?: string
    description?: string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

