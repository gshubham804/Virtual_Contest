import React from "react";
import "./CreateChallenges.css";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firedb, storage } from "../../firebase";
// import { v4 as uuidv4} from 'uuid'

// let uid = uuidv4();
const initialState = {
  challengename: "",
  startdate: "",
  enddate: "",
  description: "",
  img: "",
  level: "",
  // uid:uid,
};

export default function CreateChallenges() {
  const [state, setState] = useState(initialState);
  const [percent, setPercent] = useState("0");
  const[file,setFile] = useState();
  const { challengename, startdate, enddate, description, img, level } = state;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const fileHandleInput=(e)=>{
    if(e.target.files[0]){
      setFile(e.target.files[0]);
    }
  }

  const handleGenerate = (e) => {
    e.preventDefault();
   firedb
      .database()
      .ref('contest')
      .push(state, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Details submitted successfully");
        }
      });

      

    if (!file) {
      alert("Please choose a file first!");
      return;
    }

    let filename = img.replace(/^.*[\\\/]/, "");
    const storageRef = ref(storage, `images/${filename}`);
    const metadata = {
      contentType: 'image/png'
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
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
            className="create-challenge-form-fileds"
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
            className="create-challenge-form-fileds"
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
            className="create-challenge-form-fileds"
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
            // className="create-challenge-form-fileds"
          ></textarea>
          <br />
          <label className="CreateChallenges-blanks">Image</label>
          <br />
          <div className="image-preview">
            <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" srcset="" />
          </div>
          <input
            type="file"
            name="img"
            id=""
            value={img}
            accept="image/*"
            onChange={fileHandleInput}
            className="create-challenge-form-fileds"
          />{" "}
          <p>{percent}% Done</p>
          <br />
          <label className="CreateChallenges-blanks">Level Type</label>
          <br />
            
          <select name="level" id="" value={level} onChange={handleInputChange} className="create-challenge-form-select">
            <option className="create-challenge-options">Easy</option>
            <option className="create-challenge-options">Medium</option>
            <option className="create-challenge-options">Hard</option>
          </select>
          <br />
          <button className="CreateChallenges-btn">Create Challenge</button>
        </form>
      </div>
    </>
  );
}
