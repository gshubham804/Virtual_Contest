import React, { useEffect } from "react";
import { useState } from "react";
import "./Timer.css";
import moment from "moment";

const Timer = (props) => {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  let interval;
  const startTimer = () => {
    const timeFormat = moment(props.data).format("MMMM D YYYY");
    const countDownDate = new Date(timeFormat).getTime();
    console.log(timeFormat);
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
      if (distance < 0) {
        setTimerDays(0);
        setTimerHours(0);
        setTimerMinutes(0);
        setTimerSeconds(0);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <>
      <div className="timer-main">
        <div className="timer-days timer-common">
          <div className="timer-first">{timerDays}</div>
          <div className="timer-days-second">
            <p className="timer-para">Days</p>
          </div>
        </div>
        <div className="timer-hours timer-common">
          <div className="timer-first">{timerHours}</div>
          <div className="timer-hours-second">
            <p className="timer-para">Hours</p>
          </div>
        </div>
        <div className="timer-minutes timer-common">
          <div className="timer-first">{timerMinutes}</div>
          <div className="timer-minutes-second">
            <p className="timer-para">Mins</p>
          </div>
        </div>
        <div className="timer-seconds timer-common">
          <div className="timer-first">{timerSeconds}</div>
          <div className="timer-seconds-second">
            <p className="timer-para">Secs</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
