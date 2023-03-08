import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={styles.modal}>
        <button
          type="button"
          onClick={props.onClose}
          className={styles.close}
        ></button>
        {props.children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
