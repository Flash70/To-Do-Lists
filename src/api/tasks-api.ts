import {IEditTask, instance, IResponseTask, IResponseToDoList} from "./api"
import {ITask} from "../interface";


export const tasksAPI = {
    getTask(id: string) {
        return instance.get<ITask>(`todo-lists/${id}/tasks`).then(res => res.data)
    },
    setTask(todolistId: string, title: string) {
        return instance.post<IResponseTask>(`todo-lists/${todolistId}/tasks`, {title}).then(res => res.data)
    },
    editTask(todolistId: string,taskId: string, obj: IEditTask) {
        return instance.put<IResponseTask>(`todo-lists/${todolistId}/tasks/${taskId}`, obj).then(res => res.data)
    },
    deleteTask(todolistId: string,taskId: string) {
        return instance.delete<IResponseToDoList>(`todo-lists/${todolistId}/tasks/${taskId}`).then(res => res.data)
    },
}