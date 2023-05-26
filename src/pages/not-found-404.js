import styles from './not-found-404.module.css'


function NotFound404 () {

    return (
        <div className={styles.container}>
            <p className="text text_type_digits-large text_color_inactive">404</p>
            <p className="text text_type_main-medium text_color_inactive">Страница не найдена</p>
        </div>
    )
}

export default NotFound404;