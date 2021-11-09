import style from "./PreLoader.module.scss"

export const PreLoader = () => {
    return (
        <div className={style.loader}>
            <img src="img/preloader.gif" alt=""/>
        </div>
    )
}