import React from "react"
import style from "../../pages/Tasks/Tasks.module.scss"
import {IItemsTask} from "../../interface";
import {deleteTaskServer, editTaskServer} from "../../redux/tasks-reducer"
import {useAppDispatch} from "../../hooks"
import {FormTasks} from "./FormTasks"
import {FormType} from "./AddNewTask"


export const Task: React.FC<IItemsTask> = ({title, id, completed = false, addedDate, todoListId, status}) => {
    const dispatch = useAppDispatch()
    const [completedTask, setCompletedTask] = React.useState<boolean>(Boolean(status))
    const [editTask, setEditTask] = React.useState<boolean>(false)

    const onCompleted = () => {
        setCompletedTask(!completedTask)
        const sta = Number(!completedTask)
        const obj = {
            status: sta,
            title
        }
        dispatch(editTaskServer(todoListId, id, obj))
    }

    const onDeleteTask = () => {
        dispatch(deleteTaskServer(todoListId, id))
    }

    const editTaskTitle = () => {
      setEditTask(!editTask)
    }

    const onSubmitTask = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const title = values.task
        dispatch(editTaskServer(todoListId, id, {title}))
        setEditTask(!editTask)
        setSubmitting(false)
    }
    return (
        <>
            <div title={addedDate} className={style.block__task}>
                {editTask
                    ? <FormTasks title={title} closeNewTask={editTaskTitle} onSubmit={onSubmitTask}/>
                    : <div className={style.block__title}>
                        <input onChange={onCompleted} checked={completedTask} type="checkbox"/>
                        <h3>{title}</h3>
                    </div>}
                <div>
                    <img onClick={editTaskTitle} className={style.edit__img} src="/img/edit.svg" alt="Удалить"/>
                    <img onClick={onDeleteTask} className={style.deleteTask} src="/img/close.svg" alt="Удалить"/>
                </div>
            </div>
        </>
    )
}