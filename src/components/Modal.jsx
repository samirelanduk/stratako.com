import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import cross from "../images/cross.svg";

const Modal = props => {

  const { showModal, setShowModal } = props;
  const boxRef = useRef(null);
  const className = classNames({modal: true, visible: showModal});

  const dismiss = e => {
    if (!boxRef.current.contains(e.target)) {
      setShowModal(false);
    }
  }

  return (
    <div className={className} onClick={dismiss}>
      <div className="modal-box" ref={boxRef}>
        <img src={cross} className="dismiss" alt="dismiss" onClick={() => setShowModal(false)}/>
        {props.children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  
};

export default Modal;