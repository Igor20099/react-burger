import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
import { FunctionComponent } from "react";

interface iModalOverlayProps {
  onClose: () => void
}


const ModalOverlay: FunctionComponent<iModalOverlayProps> =({onClose}) =>{

  const handleOverlayClose = (evt:React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return <div className={styles.overlay} onClick={handleOverlayClose}></div>;
}



export default ModalOverlay;
