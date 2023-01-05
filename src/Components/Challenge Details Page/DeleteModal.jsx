import React from "react";
import "./DeleteModal.css";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import ReactDom from "react-dom";
import { firedb } from "../../firebase";

const DeleteModal = (props) => {
  console.log(props.data.data.key)
  const [cancel, setCancel] = useState(false);
  const cancelHandler = () => {
    setCancel(!cancel);
  };

  const deleteHandler = () => {

    var database = firedb.database();

// Get a reference to the data that you want to delete
var dataRef = database.ref('contest').child(props.data.data.key);

// Use the `remove()` method to delete the data
dataRef.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });

    // firedb
    //   .database()
    //   .ref("contest")
    //   .child(props.data.key)
    //   .remove(),
    //     (err) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log("Details edited successfully");
    //       }
    //     }
    //   );
  };

  return ReactDom.createPortal(
    <>
      {!cancel && (
        <>
          <div className="deletemodal-sticky">
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
          </div>
        </>
      )}
    </>,
    document.getElementById("portal-modal")
  );
};

export default DeleteModal;
