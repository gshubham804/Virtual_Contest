import React from "react";
import "./DeleteModal.css";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";

const DeleteModal = () => {
  const [cancel, setCancel] = useState(false);
  const cancelHandler = () => {
    setCancel(!cancel);
    document.body.style.opacity = 1;

  };

  const deleteHandler = () => {};

  return (
    <>
      {!cancel && (
        <div className="deletemodal-main">
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
        </div>
      )}
    </>
  );
};

export default DeleteModal;
