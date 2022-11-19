import React from "react";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "./ListPage.css";
import { useState } from "react";
import Timer from "./Timer";

export const ListPage = () => {
  let [datas, setdata] = useState([]);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    let data = firebase.database().ref("/contest");
    data.on("value", (snapshot) => {
      const results = snapshot.val();
      setdata(results);
    });

    setSearchData([])
    if(search.length>0)
    {
        let searchQuery = search.toLowerCase();
        for(const key in datas)
        {
            let fruit = datas[key].challengename.toLowerCase();
            if(fruit.includes(searchQuery)){
                setSearchData(prevResult=>{
                    return [...prevResult, datas[key].challengename]
                })
            }
        }
        }
  }, [search]);

  console.log(searchData)
  return (
    <>
      <div className="ListPage-main">
        <div className="listpage-elements">
          <div className="ListPage-searchsection">
            <h2>Explore Challenges</h2>
            <input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
            <select name="" id="">
              <option>Filter</option>
            </select>
          </div>
        </div>
        <div className="ListPage-cardsection">
          {Object.keys(datas).map((val) => {
            return (
              <div className="ListPage-card">
                <div className="ListPage-card-first">
                  <img
                    src="https://ece.engin.umich.edu/wp-content/uploads/sites/2/2022/02/JoyofCoding-featured.jpg"
                    alt=""
                    srcset=""
                  />
                </div>
                <div className="ListPage-card-second">
                  <p>Upcoming</p>
                  <h2>{datas[val].challengename}</h2>
                  <p>Starts in</p>
                  <div className="listpage-timer">
                    <Timer data={datas[val].startdate} />
                  </div>
                  <button>Participate Now</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
