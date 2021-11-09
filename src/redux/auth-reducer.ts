import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {securityAPI, securityType } from "../api/auth-api"
import { AppDispatch } from "./store"
import {authAPI} from "../api/auth-api"
import {IAuthMeAPI, ILogin, ResultCode} from "../api/api"
import { ILoginMe } from "../interface"


export interface initialStateInterface {
    data: {
        id: number | null
        email: string | null
        login: string | null
    }
    isAuth: boolean
    messages: Array<string>
    captcha?: string
}

const initialState: initialStateInterface = {
    data: {
        id: null,
        email: null,
        login: null,
    },
    isAuth: false,
    messages: [],
    captcha: "",
}


const authMeSlice = createSlice({
    name: "authMeReducer",
    initialState,
    reducers: {
        getAuthMe(state, action: PayloadAction<ILogin<IAuthMeAPI>>) {
            state.data = action.payload.data
            state.isAuth = true
        },
        getAuthMeError(state, action: PayloadAction<Array<string>>) {
            state.isAuth = false
            state.messages = action.payload
        },
        setSecurity(state, action: PayloadAction<securityType>) {
            state.captcha = action.payload.url
        },
        getOutLogin(state) {
            state.data = {id: null, email: null, login: null,}
            state.isAuth = false
        },
    }
})

const {getAuthMe, setSecurity, getOutLogin, getAuthMeError} = authMeSlice.actions


export const getAuthMeServer = () => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.getMe()
            if (res.resultCode === ResultCode.Success) {
                dispatch(getAuthMe(res))
            } else if (res.resultCode === ResultCode.Error) {
                dispatch(getAuthMeError(res.messages))
            }
    } catch (error) {
        alert("Шибка при аутентификации")
        console.error(error)
    }
}

export const setAuthMeLogin = (obj: ILoginMe) => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.loginMe(obj)
        if (res.resultCode === ResultCode.Success) {
            dispatch(getAuthMeServer())
        } else if (res.resultCode === ResultCode.captcha) {
            const res = await securityAPI.security()
            dispatch(setSecurity(res))
        } else if (res.resultCode === ResultCode.Error) {
            dispatch(getAuthMeError([res.messages.length > 0 ? res.messages[0] : "Не правильный Email или пароль"]))
        }
    } catch (error) {
        alert("Шибка при авторизации")
        console.error(error)
    }
}

export const setIsOutLogin = () => async (dispatch: AppDispatch) => {
    try {
        await authAPI.logOut()
        dispatch(getOutLogin())
    } catch (error) {
        alert("Шибка при выходе из приложения")
        console.error(error)
    }
}


export default authMeSlice.reducer