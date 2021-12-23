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

                    <svg onClick={editTaskTitle} className={style.edit__img} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9337 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.638 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825V3.36825Z" fill="black"/>
                    </svg>
                    <svg onClick={onDeleteTask} className={style.deleteTask} enable-background="new 0 0 32 32" id="Слой_1" version="1.1" viewBox="0 0 32 32"
                         xmlns="http://www.w3.org/2000/svg"><g id="Cancel"><path clip-rule="evenodd" d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16   c8.836,0,16-7.163,16-16C32,7.163,24.836,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2s14,6.268,14,14   C30,23.732,23.732,30,16,30z" fill="#121313" fill-rule="evenodd"/><path
                        clip-rule="evenodd"
                        d="M22.729,21.271l-5.268-5.269l5.238-5.195   c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.39-1.034-0.39-1.428,0l-5.231,5.188l-5.309-5.31c-0.394-0.396-1.034-0.396-1.428,0   c-0.394,0.395-0.394,1.037,0,1.432l5.301,5.302l-5.331,5.287c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.429,0   l5.324-5.28l5.276,5.276c0.394,0.396,1.034,0.396,1.428,0C23.123,22.308,23.123,21.667,22.729,21.271z"
                        fill="#121313" fill-rule="evenodd"/></g></svg>
                </div>
            </div>
        </>
    )
}