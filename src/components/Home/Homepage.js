import React, { useContext } from "react";
import styles from "./Homepage.module.css";
import Typewriter from "typewriter-effect";
import WeatherData from "./WeatherData";
import WeatherContext from "../../store/weather-context";
const Homepage = () => {
  const weatherCtx = useContext(WeatherContext);
  const { curData } = weatherCtx;
  return (
    <div className={styles.container}>
      {!curData && (
        <div className={styles.banner}>
          <Typewriter
            options={{
              strings: [
                "Check the weather of the places that you are visiting today and never get a unexpected change.",
                "Add your favorite places and stay updated with its weather.",
              ],
              autoStart: true,
              loop: true,
              changeDeleteSpeed: 2,
            }}
          />
        </div>
      )}
      {curData && <WeatherData curData={curData} />}
    </div>
  );
};

export default Homepage;
