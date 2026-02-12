import React from "react";

const Modal = ({ onClose  ,confirmToComplete , ConfirmationContent ,ConfirmationHeader}) => {

  const confirmUpdate = () => {
    console.log("Confirm");
    onClose(false)
    confirmToComplete()
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop fade show"></div>

      {/* Modal */}
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ConfirmationHeader}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => onClose(false)}
              ></button>
            </div>

            <div className="modal-body">
              <p>{ConfirmationContent}</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onClose(false)}
              >
                Close
              </button>
              <button
                type="button"
                onClick={confirmUpdate}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
