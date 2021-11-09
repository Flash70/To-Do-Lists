import React from "react"
import style from "./login.module.scss"
import {setAuthMeLogin} from "../../redux/auth-reducer"
import {useAppDispatch} from "../../hooks"
import {ILoginMe} from "../../interface"

interface ILoginProps {
    captcha: string | undefined
    messages: Array<string>
}

export const Login: React.FC<ILoginProps> = ({captcha, messages}) => {
    const dispatch = useAppDispatch()
    const [email, setEmail] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [rememberMe, setRememberMe] = React.useState<boolean>(true)
    const [captchaInput, setCaptchaInput] = React.useState<string>("")


    const emailHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const passwordHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const rememberMedHandle = () => {
        setRememberMe(!rememberMe)
    }
    const onLogin = () => {
        const obj: ILoginMe = {email, password, rememberMe, captcha: captchaInput}
        dispatch(setAuthMeLogin(obj))
    }
    const captchaHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaptchaInput(e.currentTarget.value)
    }

    return (
        <>
            <div><h1>Login</h1></div>
            <div className={style.login}>
                <input value={email} name={"email"} type="email" onChange={emailHandle}/>
            </div>
            <div>
                <input value={password} name={"password"} type="password" onChange={passwordHandle}/>
            </div>
            <div>
                <input checked={rememberMe} name={"rememberMe"} type="checkbox" onChange={rememberMedHandle}/>
            </div>
            {messages && <div className={style.error}><span>{messages}</span></div>}
            {captcha && <>
                <div>
                    <img src={captcha} alt="captcha"/>
                </div>
                <div>
                    <input value={captchaInput} type="text" name={"captcha"} onChange={captchaHandle}/>
                </div>
            </>

            }
            <div>
                <button onClick={onLogin}>Login</button>
            </div>
        </>
    )
}