import style from "../../pages/Lists/Lists.module.scss"
import React from "react"
import {setNewToDoList} from "../../redux/todo-lists-reducer"
import {useAppDispatch} from "../../hooks"
import {IToDo} from "../../api/api"

interface IProps {
    toDoLists: IToDo[]
    clickAddNewList: () => void
}


export const AddNewList: React.FC<IProps> = ({clickAddNewList, toDoLists}) => {
    const dispatch = useAppDispatch()
    const [toDoList, setToDoList] = React.useState<string>("")
    console.log(toDoList.length)

    const setToDo = (e: React.ChangeEvent<HTMLInputElement>) => {                             // набор символов в input
        setToDoList(e.currentTarget.value)
    }
    const onToDo = () => {                                                                   // Добавление нового списка
        if (toDoList.length === 0) {
            alert("Поле не может быть пустым")
        } else if (toDoLists.find(item => item.title.toLowerCase() === toDoList.toLowerCase())) {
            alert("Такой список уже существует")
        } else if (toDoList.length >= 30) {
            alert("Не больше 30 символов")
        } else {
            const obj = {title: toDoList}
            dispatch(setNewToDoList(obj))
            setToDoList("")
            clickAddNewList()
        }
    }
    return (
        <>
            <div className={style.blockNewList}>
                <input value={toDoList} placeholder={"Название списка"} type="text" onChange={setToDo}/>
                <button onClick={onToDo}>Добавить</button>
                <svg className={style.close__svg} onClick={clickAddNewList} id="Слой_1" version="1.1"
                     viewBox="0 0 32 32"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="Cancel">
                        <path
                            d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16   c8.836,0,16-7.163,16-16C32,7.163,24.836,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2s14,6.268,14,14   C30,23.732,23.732,30,16,30z"
                            fill="#121313"/>
                        <path
                            d="M22.729,21.271l-5.268-5.269l5.238-5.195   c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.39-1.034-0.39-1.428,0l-5.231,5.188l-5.309-5.31c-0.394-0.396-1.034-0.396-1.428,0   c-0.394,0.395-0.394,1.037,0,1.432l5.301,5.302l-5.331,5.287c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.429,0   l5.324-5.28l5.276,5.276c0.394,0.396,1.034,0.396,1.428,0C23.123,22.308,23.123,21.667,22.729,21.271z"
                            fill="#121313"/>
                    </g>
                    <g/>
                </svg>
            </div>
        </>
    )
}