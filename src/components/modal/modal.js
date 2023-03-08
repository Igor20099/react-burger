import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={styles.modal}>
        <h2 className="text text_type_main-large mr-10 mt-15 ml-10">
          {props.title}
        </h2>
        <button type="button" onClick={props.onClose} className={styles.close}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
