import React from "react";
import "./EditChallenges.css";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firedb, storage } from "../../firebase";

export default function EditChallenges(props) {
  const initialState = {
    challengename: props.data.challengename,
    startdate: props.data.startdate,
    enddate: props.data.enddate,
    description: props.data.description,
    img: props.data.img,
    level: props.data.level,
  };

  const [state, setState] = useState(initialState);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState();
  const { challengename, startdate, enddate, description, img, level } = state;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value,
    }));

    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please choose a file first!");
      return;
    }

    let filename = img.replace(/^.*[\\\/]/, "");
    const storageRef = ref(storage, `images/${filename}`);
    const metadata = {
      contentType: "image/*",
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          firedb
            .database()
            .ref("contest")
            .child(props.data.key)
            .update(
              {
                challengename: challengename,
                startdate: startdate,
                enddate: enddate,
                description: description,
                img: url,
                level: level,
              },
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Details edited successfully");
                }
              }
            );
        });
      }
    );
    setState({
      challengename: "",
      startdate: "",
      enddate: "",
      description: "",
      img: "",
      level: "Easy",
    });
  };

  return (
    <>
      <div className="EditChallenges-main">
        <h1 className="EditChallenges-head">Edit Challenge Details</h1>
        <form onSubmit={handleGenerate}>
          <label className="EditChallenges-blanks">Challenge Name</label>
          <br />
          <input
            type="text"
            name="challengename"
            defaultValue={state.challengename}
            value={challengename}
            onChange={handleInputChange}
            className="edit-challenge-form-fileds"
          />
          <br />
          <label className="EditChallenges-blanks">Start Date</label>
          <br />
          <input
            type="date"
            name="startdate"
            id=""
            defaultValue={state.startdate}
            value={startdate}
            onChange={handleInputChange}
            className="edit-challenge-form-fileds"
          />
          <br />
          <label className="EditChallenges-blanks">End Date</label>
          <br />
          <input
            type="date"
            name="enddate"
            id=""
            defaultValue={state.enddate}
            value={enddate}
            onChange={handleInputChange}
            className="edit-challenge-form-fileds"
          />
          <br />
          <label className="EditChallenges-blanks">Description</label>
          <br />
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            defaultValue={state.description}
            value={description}
            onChange={handleInputChange}
          ></textarea>
          <br />
          <label className="EditChallenges-blanks">Image</label>
          <br />
          <div className="image-preview">
            <img src={state.img} />
          </div>
          <input
            type="file"
            name="img"
            id=""
            accept="image/*"
            onChange={handleInputChange}
            className="edit-challenge-form-fileds"
          />{" "}
          <p>{progress}% Done</p>
          <br />
          <label className="EditChallenges-blanks">Level Type</label>
          <br />
          <select
            name="level"
            id=""
            defaultValue={state.level}
            value={level}
            onChange={handleInputChange}
            className="create-challenge-form-select"
          >
            <option className="edit-challenge-options">Easy</option>
            <option className="edit-challenge-options">Medium</option>
            <option className="edit-challenge-options">Hard</option>
          </select>
          <br />
          <button className="EditChallenges-btn">Save</button>
        </form>
      </div>
    </>
  );
}
