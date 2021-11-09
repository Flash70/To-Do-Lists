import React from "react"
import {createTaskServer} from "../../redux/tasks-reducer"
import {useAppDispatch} from "../../hooks"
import {FormTasks} from "./FormTasks"


export interface FormType {
    task: string
}

interface IAddNewTaskProps {
    id: string
    setOnEdit: (params: boolean) => void
    closeNewTask: React.MouseEventHandler<HTMLButtonElement>
}


export const AddNewTask: React.FC<IAddNewTaskProps> = ({id, closeNewTask, setOnEdit}) => {
    const dispatch = useAppDispatch()


    const onSubmit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const title = values.task
        dispatch(createTaskServer(id, title))
        setSubmitting(false)
        setOnEdit(false)
    }
    return (
        <>
            <FormTasks closeNewTask={closeNewTask} onSubmit={onSubmit}/>
        </>
    )
}