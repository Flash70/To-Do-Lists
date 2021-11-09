import React from "react"
import style from "./Lists.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks"
import {deleteToDoListServer, getToDoListsServer} from "../../redux/todo-lists-reducer"
import {List} from "../../componets/List"
import {AddNewList} from "../../componets/List/AddNewList"
import {useHistory} from "react-router-dom"
import {PreLoader} from "../../componets/PreLoader/PreLoader"

interface IProps {
    isAuthApp: boolean
}

export const Lists: React.FC<IProps> = ({isAuthApp}) => {
    const dispatch = useAppDispatch()
    let history = useHistory()

    const [addNewList, setAddNewList] = React.useState<boolean>(false)
    const {lists, isAuth} = useAppSelector(state => state.toDoListSlice)

    React.useEffect(() => {
        isAuthApp && dispatch(getToDoListsServer())
    }, [isAuthApp])


    const onDeleteList = (id: string) => {             // удаление списка задач
        dispatch(deleteToDoListServer(id))
        history.push("/")
    }

    const clickAddNewList = () => {                    // показать блок AddNewList
        setAddNewList(!addNewList)
    }

    if (!isAuth) {
        return <PreLoader/>
    }

    return (
        <>
            <div className={style.title}>
                <h2>Списки дел</h2>
            </div>
            <div className={style.sidebar__list}>
                {lists.map(item => <List key={item.id} toDoLists={lists} {...item} onDelete={onDeleteList}/>)}
            </div>
            <div onClick={clickAddNewList} className={style.addNewList}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15" stroke="black"/>
                    <path d="M1 8H15" stroke="black"/>
                </svg>
                <span>Добавить список</span>
            </div>
            {addNewList && <AddNewList toDoLists={lists} clickAddNewList={clickAddNewList}/>}
        </>
    )
}