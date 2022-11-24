import React from "react";
import "./EditChallenges.css";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firedb, storage } from "../../firebase";
import { v4 as uuidv4} from 'uuid'


export default function EditChallenges(props) {
  console.log(props.data.uid);
    const initialState = {
        challengename:props.data.challengename,
        startdate: props.data.startdate,
        enddate:props.data.enddate,
        description:props.data.description,
        img:props.data.img,
        level:props.data.level,
      };

  const [state, setState] = useState([initialState]);
  const [percent, setPercent] = useState("0");
  const { challengename, startdate, enddate, description, img, level } = state;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    firedb
    .database()
    .ref("contest/")
    .child(props.data.uid)
      .update(state, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Details edited successfully");
        }
      });

    if (!img) {
      alert("Please choose a file first!");
    }

    let filename = img.replace(/^.*[\\\/]/, "");
    const uid = uuidv4();
    const storageRef = ref(storage, `images/${uid}/${filename}`);
    const metadata = {
      contentType: 'image/png'
     
    };
    const uploadTask = uploadBytesResumable(storageRef, filename, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
    setState(initialState);
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
            defaultValue={state[0].challengename}
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
            defaultValue={state[0].startdate}
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
            defaultValue={state[0].enddate}
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
            defaultValue={state[0].description}
            value={description}
            onChange={handleInputChange}
          ></textarea>
          <br />
          <label className="EditChallenges-blanks">Image</label>
          <br />
          <div className="image-preview">
            <img
             defaultValue={state[0].img} 
             src=""/>
          </div>
          <input
            type="file"
            name="img"
            id=""
            value={img}
            accept="image/*"
            onChange={handleInputChange}
            className="edit-challenge-form-fileds"
          />{" "}
          <p>{percent}% Done</p>
          <br />
          <label className="EditChallenges-blanks">Level Type</label>
          <br />
            
          <select name="level" id=""
           defaultValue={state[0].level}
            value={level} onChange={handleInputChange} className="create-challenge-form-select">
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
