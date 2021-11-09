import {instance, IPostToDoLists, IResponseToDoList, IToDo} from "./api"


export const toDoAPI = {
    getToDoLists() {
        return instance.get<IToDo[]>("todo-lists").then(res => res.data)
    },
    setToDoList(obj: IPostToDoLists) {
      return instance.post<IResponseToDoList>("todo-lists", obj).then(res => res.data)
    },
    deleteToDoList(todolistId: string) {
        return instance.delete<IResponseToDoList>(`todo-lists/${todolistId}` ).then(res => res.data)
    },
    editToDoList(todolistId: string, obj: IPostToDoLists) {
        return instance.put<IResponseToDoList>("todo-lists/" + todolistId, obj).then(res => res.data)
    },
}