import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function Modal(
  { title, content, onConfirm, onReset },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      },
    };
  });

  // 여백 클릭시 닫기
  function handleClose(e) {
    if (e.target.nodeName === "DIALOG") {
      dialog.current.close();
    }
  }

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onReset}
      onClick={handleClose}
      className="ui-modal min-w-80 rounded-lg"
    >
      <h2 className="py-2 px-4 bg-point text-active font-bold">{title}</h2>
      <div className="modal-content p-4">
        <p>{content}</p>
      </div>

      <form
        method="dialog"
        onSubmit={onReset}
        className="py-2 px-4 flex justify-end"
      >
        <Button type="button" onClick={onConfirm}>
          Confirm
        </Button>
        <Button>Close</Button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
