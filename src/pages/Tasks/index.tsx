import {useAppDispatch, useAppSelector} from "../../hooks"
import {getTaskServer} from "../../redux/tasks-reducer"
import {useParams} from "react-router-dom"
import {Task} from "../../componets/Task"
import React from "react"
import style from "./Tasks.module.scss"
import {AddNewTask} from "../../componets/Task/AddNewTask"

interface IParams {
    id: string
}


export const Tasks = () => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector((state) => state.tasksSlice)
    const [onEdit, setOnEdit] = React.useState<boolean>(false)
    const {id} = useParams<IParams>()

    React.useEffect(() => {
        dispatch(getTaskServer(id))
    }, [id])

    const closeNewTask = () => {
        setOnEdit(!onEdit)
    }


    return (
        <>
            {!onEdit ?
                <div className={style.formNew} onClick={() => setOnEdit(!onEdit)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 8H15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Новая задача</span>
                </div>
                : <AddNewTask id={id} closeNewTask={closeNewTask} setOnEdit={setOnEdit}/>
            }

            {tasks.items.length !== 0
                ? <div className={style.block__tasks}>
                    {tasks.items.map(item => <Task key={item.id} {...item} />)}
                </div>
                : <div className={style.info}><span>"Задачи отсутствуют"</span></div>}
        </>
    )
}