import React from "react";
import "./CreateChallenges.css";
import firedb from '../../firebase'
import { useState } from "react";

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
  const { challengename, startdate, enddate, description, img, level } = state;
  const handleInputChange = (e) => {
    const{name,value}=e.target;
    setState(state => ({
        ...state,
        [name]: value
    })); 
  };

  const handleGenerate=(e)=>{
    e.preventDefault();
    firedb.child("contest").push(state,(err)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        console.log("Details submitted successfully")
      }
    })
    setState(initialState);
  }
  return (
    <>
      <div className="CreateChallenges-main">
        <h1 className="CreateChallenges-head">Challenge Details</h1>
        <form onSubmit={handleGenerate}>
        <label className="CreateChallenges-blanks">Challenge Name</label>
        <br />
        <input type="text" name="challengename" value={challengename} onChange={handleInputChange} />
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
        />
        <br />
        <label className="CreateChallenges-blanks">Level Type</label>
        <br />
        <select name="level" id="" value={level} onChange={handleInputChange}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <br />
        <button className="CreateChallenges-btn" >Create Challenge</button>
      </form>
      </div>
    </>
  );
}
