import React from "react";
import { createPortal } from "react-dom";

import errorIcon from "../assets/error.svg";

const ErrorModal = React.forwardRef(function ErrorModal({ error }, ref) {
  const modalRef = React.useRef(null);

  React.useImperativeHandle(ref, () => {
    return {
      openModal() {
        modalRef.current.showModal();
      },
      closeModal() {
        modalRef.current.close();
      },
    };
  });

  return createPortal(
    <dialog
      ref={modalRef}
      className="error-modal flex flex-col gap-8 items-center py-4 bg-white text-red-800 w-96 p-2 rounded-md text-center"
    >
      <img src={errorIcon} alt="Error Icon" className="w-20" />
      <p className="text-xl">{error}</p>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default ErrorModal;
