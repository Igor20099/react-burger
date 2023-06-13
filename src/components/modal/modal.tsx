import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React,{FunctionComponent,ReactNode} from "react";
import PropTypes from "prop-types";
import { useNavigate,useLocation } from "react-router-dom";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
  title?:string;
  children?:ReactNode;
  setIsModal: (isModal:boolean) => void;
  onClose: () => void;

}

const Modal : FunctionComponent<IModalProps> = ({ title, children, setIsModal, onClose })  =>{
  const navigate = useNavigate();
  const location = useLocation()
  React.useEffect(() => {
    const handleEscapeClose = (evt:KeyboardEvent) => {
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
 
    navigate(location?.state.background.pathname)
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


export default Modal;
