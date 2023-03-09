import styles from './modal-overlay.module.css'


function ModalOverlay(props) {
    
    return (
        <div className={styles.overlay} onClick={props.overlayClose}></div>
    )
}

export default ModalOverlay;