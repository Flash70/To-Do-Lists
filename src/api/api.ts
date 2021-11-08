import axios from "axios";
import {IUser} from "../type/interface";


export const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "ef985269-a9ea-44ef-8f52-1417dfebe658"},
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
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
export interface IGetItems {
    items: Array<IUser>
    totalCount: number
    error: string | null
}
export interface IStatusProfile<D = {}, RS = ResultCode> {
    resultCode: RS
    messages: Array<string>
    data: D
}


