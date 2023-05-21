import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import { useNavigate,useLocation } from "react-router-dom";

const modalRoot = document.getElementById("react-modals");

function Modal({ title, children, setIsModal, onClose }) {
  const navigate = useNavigate();
  const location = useLocation()
  React.useEffect(() => {
    const handleEscapeClose = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, []);
  console.log(location.state)
console.log(location.pathname)
  function handleCloseModal() {
    onClose();
    setIsModal(false);
 
    navigate(location.state.background.pathname)
    localStorage.removeItem("isModal");
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={handleCloseModal} />
      <div className={styles.modal}>
        <h2 className="text text_type_main-large mr-40 ml-10">{title}</h2>
        <button
          type="button"
          onClick={handleCloseModal}
          className={styles.close}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  setIsModal: PropTypes.func,
};

export default Modal;
