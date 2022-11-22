import React from "react";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "./ListPage.css";
import { useState, useRef } from "react";
import Timer from "./Timer";
import moment from "moment";
import { IoIosArrowDown } from "react-icons/io";

export const ListPage = () => {
  const [borderRadius, setBorderRadius] = useState("12px");
  const [showFilterSection, setShowFilterSection] = useState(false);
  const [datas, setdata] = useState([]);
  const [search, setSearch] = useState("");
  const [checkBoxValue, setCheckBoxValue] = useState("All");

  useEffect(() => {
    let data = firebase.database().ref("/contest");
    data.on("value", (snapshot) => {
      const results = snapshot.val();
      setdata(results);
    });
  }, [search, checkBoxValue]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const listPageFilterOption = document.querySelector(
    ".listpage-filter-option"
  );
  const listpageIcon = document.querySelector(".listpage-icon");

  const showFilterHandler = () => {
    listpageIcon.classList.add("dropdown-rotate");
    setShowFilterSection(!showFilterSection);
    setBorderRadius("12px");
    if (showFilterSection) {
      listPageFilterOption.style.display = "block";
    } else {
      listpageIcon.classList.remove("dropdown-rotate");
      setBorderRadius("0px");
    }
  };

  const getContest = (data) => {
    if (checkBoxValue == "All" || checkBoxValue == "") {
      return true;
    } else if (checkBoxValue === "Active") {
      if (
        new Date(
          moment(datas[data].startdate).format("MMMM D YYYY")
        ).getTime() -
          new Date().getTime() <=
          0 &&
        new Date(moment(datas[data].enddate).format("MMMM D YYYY")).getTime() -
          new Date().getTime() >=
          0
      ) {
        return true;
      } else return false;
    } else if (checkBoxValue === "Past") {
      if (
        new Date(
          moment(datas[data].startdate).format("MMMM D YYYY")
        ).getTime() -
          new Date().getTime() <
        0
      ) {
        return true;
      } else return false;
    } else if (checkBoxValue === "Upcoming") {
      if (
        new Date(
          moment(datas[data].startdate).format("MMMM D YYYY")
        ).getTime() -
          new Date().getTime() >
        0
      ) {
        return true;
      } else return false;
    } else return false;
  };

  const checkBoxHandler = (e) => {
    let selectedCheckBoxValue = e.target.value;
    let checkboxes = document.getElementsByName("check");
    checkboxes.forEach((item) => {
      if (item.value !== selectedCheckBoxValue) item.checked = false;
    });

    if (selectedCheckBoxValue !== checkBoxValue) {
      setCheckBoxValue(selectedCheckBoxValue);
    } else {
      setCheckBoxValue("");
    }
  };

  return (
    <div className="ListPage-main">
      <div className="listpage-elements">
        <div className="ListPage-searchsection">
          <h2>Explore Challenges</h2>
          <input
            className="search-bar-on-click"
            type="text"
            placeholder="Search"
            onChange={searchHandler}
          />
          <div
            class="listpage-filter"
            style={{
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              borderBottomLeftRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
            }}
            onClick={showFilterHandler}
          >
            <h3 value="Filter">Filter</h3>
            <IoIosArrowDown className="listpage-icon dropdown-rotate" />
          </div>
          {showFilterSection && (
            <div class="listpage-filter-option">
              <h3>Status</h3>
              <label for="">
                {" "}
                <input
                  name="check"
                  type="checkbox"
                  id="one"
                  value="All"
                  onChange={checkBoxHandler}
                />
                All
              </label>
              <br />
              <label for="">
                {" "}
                <input
                  type="checkbox"
                  name="check"
                  id="two"
                  value="Active"
                  onChange={checkBoxHandler}
                />
                Active
              </label>
              <br />
              <label for="">
                {" "}
                <input
                  type="checkbox"
                  name="check"
                  id="three"
                  value="Upcoming"
                  onChange={checkBoxHandler}
                />
                Upcoming
              </label>
              <br />
              <label for="">
                {" "}
                <input
                  type="checkbox"
                  name="check"
                  id="four"
                  value="Past"
                  onChange={checkBoxHandler}
                />
                Past
              </label>
              <br />
              <h3>Level</h3>
              <label for="">
                {" "}
                <input
                  type="checkbox"
                  name="check"
                  id="five"
                  value="Easy"
                  onChange={checkBoxHandler}
                />
                Easy
              </label>
              <br />
              <label for="">
                {" "}
                <input
                  type="checkbox"
                  name="check"
                  id="six"
                  value="Medium"
                  onChange={checkBoxHandler}
                />
                Medium
              </label>
              <br />
              <label for="">
                {" "}
                <input
                  type="checkbox"
                  name="check"
                  id="seven"
                  value="Hard"
                  onChange={checkBoxHandler}
                />
                Hard
              </label>
              <br />
            </div>
          )}
        </div>
      </div>
      <div className="ListPage-cardsection">
        {Object.keys(datas)
          .filter(
            (val) =>
              datas[val].challengename
                .toLowerCase()
                .includes(search.toLowerCase()) && getContest(val)
          )
          .map((val) => {
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
                  {new Date(
                    moment(datas[val].startdate).format("MMMM D YYYY")
                  ).getTime() -
                    new Date().getTime() <=
                    0 &&
                    new Date(
                      moment(datas[val].enddate).format("MMMM D YYYY")
                    ).getTime() -
                      new Date().getTime() >=
                      0 && <p>Active</p>}
                  {new Date(
                    moment(datas[val].startdate).format("MMMM D YYYY")
                  ).getTime() -
                    new Date().getTime() <
                    0 && <p>Past</p>}
                  {new Date(
                    moment(datas[val].startdate).format("MMMM D YYYY")
                  ).getTime() -
                    new Date().getTime() >
                    0 && <p>Upcoming</p>}
                  {/* <p>Upcoming</p> */}
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
  );
};
