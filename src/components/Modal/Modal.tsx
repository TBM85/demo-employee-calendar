import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";

const Modal = ({ title, content, buttonText, onCloseModal }: ModalProps) => {
  // Create a reference element which will be used to mount the modal and the backdrop
  const modalRoot = document.getElementById('modal-root');
  const backdropRoot = document.getElementById('backdrop-root');

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <div className={classes.Backdrop}></div>,
        backdropRoot as HTMLElement
      )}
      {ReactDOM.createPortal(
        <div className={classes.ModalContainer}>
          <div className={classes.Modal}>
            <div className={classes["modal-header"]}>
              <h2>{title}</h2>
            </div>
            <div className={classes["modal-body"]}>
              <p>{content}</p>
            </div>
            <button type="button" onClick={() => onCloseModal(false)}>
              {buttonText}
            </button>
          </div>
        </div>,
        modalRoot as HTMLElement
      )}
    </Fragment>
  );
};

export default Modal;
