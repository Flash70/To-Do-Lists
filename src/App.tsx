import React from 'react'
import './App.scss'
import {Login} from "./pages/Login"
import {useAppDispatch, useAppSelector} from './hooks'
import {Route, useHistory} from 'react-router-dom'
import {Lists} from "./pages/Lists"
import {PreLoader} from './componets/PreLoader/PreLoader'
import {initializeApp} from './redux/app-reducer'
import {Tasks} from "./pages/Tasks"
import {setIsOutLogin} from "./redux/auth-reducer"

function App() {
    const me = useAppSelector((state) => state.authMeSlice)
    const {initialized} = useAppSelector((state) => state.initializeApp)
    const dispatch = useAppDispatch()
    const history = useHistory()

    React.useEffect(() => {
        dispatch(initializeApp())
    }, [])

    const logOut = () => {                              // выход из профиля
        dispatch(setIsOutLogin())
        history.push("/login")
    }

    if (!initialized) {
        return <PreLoader/>
    }

    return (
        <div className="todo">
            {me.isAuth && <button className="todo__btn" onClick={logOut}>Выход</button>}
            <div className="todo__sidebar">
                <Route path={"/"} render={() => <Lists isAuthApp={me.isAuth}/>}/>
            </div>
            <div className="todo__tasks">
                {
                    me.isAuth ?
                        <Route exact path={"/tasks/:id"} render={() => <Tasks/>}/>
                        : <Login captcha={me.captcha} messages={me.messages}/>
                }
            </div>
        </div>
    )
}

export default App
