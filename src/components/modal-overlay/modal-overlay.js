import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";


function ModalOverlay(props) {
    
    return (
        <div className={styles.overlay} onClick={props.overlayClose}></div>
    )
}

ModalOverlay.propTypes = {
    overlayClose: PropTypes.func,
}

export default ModalOverlay;