import React from "react";
import "./DeleteModal.css";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import ReactDom from 'react-dom'
// import firebase from "firebase/compat/app";


const DeleteModal = () => {
  const [cancel, setCancel] = useState(false);
  const cancelHandler = () => {
    setCancel(!cancel);

  };

  const deleteHandler = () => {};

  return ReactDom.createPortal(<>
    {!cancel && (
      <>
      <div className="deletemodal-main"></div>
        <div className="deletemodal-container">
          <div className="deletemodal-largecross-btn">
            <MdOutlineCancel />
          </div>
          <div className="deletemodal-heading">
            <h2>Are you sure?</h2>
          </div>
          <div className="deletemodal-paragraph">
            <p>
              Do you really want to delete these records? This
              <br /> process cannot be undone.
            </p>
          </div>
          <div className="deletemodal-button">
            <button
              className="deletemodal-cancel-btn"
              onClick={cancelHandler}
            >
              Cancel
            </button>
            <button
              className="deletemodal-delete-btn"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </div>
        </>
    )}
  </>,document.getElementById('portal-modal'));
    
    
  
};

export default DeleteModal;
