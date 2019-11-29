import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const ModalWrapper = ({ isShowing, hide, Wrapper, bckgrnd }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={evt => {
              if (evt.target.className === "modal-wrapper") {
                hide();
              }
            }}
          >
            <div className={bckgrnd ? "modal" : "modalhidden"}>
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {Wrapper}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default ModalWrapper;
