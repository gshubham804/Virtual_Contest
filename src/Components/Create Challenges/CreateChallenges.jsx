import React from "react";
import "./CreateChallenges.css";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firedb, storage } from "../../firebase";
import { v4 as uuidv4} from 'uuid'
const initialState = {
  challengename: "",
  startdate: "",
  enddate: "",
  description: "",
  img: "",
  level: "",
};

export default function CreateChallenges() {
  const [state, setState] = useState(initialState);
  const [percent, setPercent] = useState("0");
  const { challengename, startdate, enddate, description, img, level } = state;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  console.log(img);

  const handleGenerate = (e) => {
    e.preventDefault();
    firedb
      .database()
      .ref()
      .child("contest")
      .push(state, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Details submitted successfully");
        }
      });

    if (!img) {
      alert("Please choose a file first!");
    }

    let filename = img.replace(/^.*[\\\/]/, "");
    console.log(filename);
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
      <div className="CreateChallenges-main">
        <h1 className="CreateChallenges-head">Challenge Details</h1>
        <form onSubmit={handleGenerate}>
          <label className="CreateChallenges-blanks">Challenge Name</label>
          <br />
          <input
            type="text"
            name="challengename"
            value={challengename}
            onChange={handleInputChange}
          />
          <br />
          <label className="challenge-blanks">Start Date</label>
          <br />
          <input
            type="date"
            name="startdate"
            id=""
            value={startdate}
            onChange={handleInputChange}
          />
          <br />
          <label className="CreateChallenges-blanks">End Date</label>
          <br />
          <input
            type="date"
            name="enddate"
            id=""
            value={enddate}
            onChange={handleInputChange}
          />
          <br />
          <label className="CreateChallenges-blanks">Description</label>
          <br />
          <textarea
            name="description"
            id=""
            cols="30"
            rows="10"
            value={description}
            onChange={handleInputChange}
          ></textarea>
          <br />
          <label className="CreateChallenges-blanks">Image</label>
          <br />
          <input
            type="file"
            name="img"
            id=""
            value={img}
            accept="image/*"
            onChange={handleInputChange}
          />{" "}
          <p>{percent}% Done</p>
          <br />
          <label className="CreateChallenges-blanks">Level Type</label>
          <br />
          <select name="level" id="" value={level} onChange={handleInputChange}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <br />
          <button className="CreateChallenges-btn">Create Challenge</button>
        </form>
      </div>
    </>
  );
}
