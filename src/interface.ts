export interface ILoginMe {
    email: string
    password: string
    rememberMe: boolean
    captcha?: null | string
}

export interface IItemsTask {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export interface ITask {
    items: IItemsTask[]
    totalCount: number
    error: string
}