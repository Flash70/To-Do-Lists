import { ILoginMe } from "../interface"
import {IAuthMeAPI, ILogin, ILoginMeResponse, instance } from "./api"


export const authAPI = {
    getMe() {
        return instance.get<ILogin<IAuthMeAPI>>("auth/me").then(res => res.data)
    },
    loginMe(obj: ILoginMe) {
        return instance.post<ILogin<ILoginMeResponse>>("auth/login", obj).then(res => res.data)
    },
    logOut() {
        return instance.delete<ILogin<ILoginMeResponse>>("auth/login").then(res => res.data)
    }
}

export interface securityType {
    url: string
}

export const securityAPI = {
    security() {
        return instance.get<securityType>("security/get-captcha-url").then(res => res.data)
    }
}