import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import styles from "./WeatherData.module.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function calcTime(offset) {
  var nd = new Date();
  var utc = nd.getTime() + nd.getTimezoneOffset() * 60000;
  var d = new Date(utc + 1000 * offset);
  let day = days[d.getDay()];
  let minutes = d.getMinutes();
  let hour = d.getHours();
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return { day, minutes, hour, date, month, year };
}

const WeatherData = ({ curData }) => {
  const [dateInfo, setDateInfo] = useState();
  useEffect(() => {
    const timer = setInterval(() => {
      const dateObj = calcTime(curData.offset);
      setDateInfo(dateObj);
    }, 10);
    return () => {
      clearInterval(timer);
    };
  }, [curData]);

  return (
    <>
      <div className={styles.top} >
        <div className={styles.left}>
          <div className={styles.temp}>{curData.temp}&#186;</div>
          <div className={styles.box}>
            <div className={styles.city}>{curData.name}</div>
            {dateInfo && (
              <div className={styles.date}>
                {dateInfo.hour}:{dateInfo.minutes}-{dateInfo.day} ,
                {dateInfo.date} {dateInfo.month}'{dateInfo.year}
              </div>
            )}
          </div>
          <div className={styles.image}>
            <img
              src={`http://openweathermap.org/img/wn/${curData.icon}@2x.png`}
              alt="weather_icon"
            />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.banner}>
          <div className={styles.title}>Minimum temperature</div>
          <div className={styles.value}>{curData.minTemp}&#186;</div>
        </div>
        <div className={styles.banner}>
          <div className={styles.title}>Maximum temperature</div>
          <div className={styles.value}>{curData.maxTemp}&#186; </div>
        </div>
        <div className={styles.banner}>
          <div className={styles.title}>Pressure</div>
          <div className={styles.value}>{curData.pressure}Pa</div>
        </div>
        <div className={styles.banner}>
          <div className={styles.title}>Humidity</div>
          <div className={styles.value}>{curData.humidity}%</div>
        </div>
        <div className={styles.banner}>
          <div className={styles.title}>Wind</div>
          <div className={styles.value}>{curData.wind}m/s</div>
        </div>
      </div>
    </>
  );
};

export default WeatherData;
