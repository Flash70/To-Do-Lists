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
                    <img src="/img/add.svg" alt="Add"/>
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