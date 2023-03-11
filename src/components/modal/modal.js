import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
  React.useEffect(() => {
    const handleEscapeClose = (evt) => {
      if (evt.key === "Escape") {
        props.onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  },[]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={props.onClose}/>
      <div className={styles.modal}>
        <h2 className="text text_type_main-large mr-40 ml-10">{props.title}</h2>
        <button type="button" onClick={props.onClose} className={styles.close}>
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;
