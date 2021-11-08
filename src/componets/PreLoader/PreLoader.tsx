import style from "./PreLoader.module.scss"

export const PreLoader = () => {
    return (
        <div className={style.loader}>
            <img src="images/preloader.gif" alt=""/>
        </div>
    )
}