import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {

  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  };

  return <div className={styles.overlay} onClick={handleOverlayClose}></div>;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;
