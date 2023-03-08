import styles from './modal.module.css'

function Modal() {

    return (
        <div className={styles.modal}>
            <button className={styles.close}></button>
        </div>
    )
}

export default Modal