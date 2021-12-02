import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "./MenuList.module.css";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import WeatherContext from "../../store/weather-context";
import {
  AiOutlineDelete,
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineUndo,
  AiOutlinePlus,
} from "react-icons/ai";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
const MenuList = ({ setShowMenu }) => {
  //store provides all th necessary functions to manange the app
  const weatherCtx = useContext(WeatherContext);
  const {
    curData,
    placesArray,
    addPlaceHandler,
    isSelected,
    hideUnhideHandler,
    deleteHandler,
    resetHandler,
    undoHanlder,
    undoArray,
  } = weatherCtx;
  //states and refs
  const [showHidden, setShowHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //sets the new array evenry time hide,unhide or delete happens
  const [newArray, setNewArray] = useState([...placesArray]);
  const cityRef = useRef();

  //get the location data
  const getInfoHandler = async (cityName) => {
    let data;
    try {
      setIsLoading(true);
      data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
      console.log(data);
      if (data.status !== 200) {
        throw new Error(data.json());
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Please enter a valid city name");
    }
    if (data) {
      const weatherId = parseFloat((data.data.weather[0].id / 100).toFixed(0));
      let imageName = "bg";
      if (weatherId === 2) {
        imageName = "thunder";
      } else if (weatherId === 3) {
        imageName = "drizzle";
      } else if (weatherId === 5) {
        imageName = "rain";
      } else if (weatherId === 6) {
        imageName = "snow";
      } else if (data.data.weather[0].id === 800) {
        imageName = "clouds";
      } else if (data.data.weather[0].id >= 801) {
        imageName = "clear";
      } else if (
        data.data.weather[0].id >= 701 &&
        data.data.weather[0].id <= 741
      ) {
        imageName = "mist";
      } else {
        imageName = "sand";
      }
      //only sets the require data
      const newObj = {
        name: data.data.name,
        id: data.data.weather[0].id,
        icon: data.data.weather[0].icon,
        temp: data.data.main.temp.toFixed(0),
        minTemp: data.data.main.temp_min.toFixed(0),
        maxTemp: data.data.main.temp_max.toFixed(0),
        pressure: data.data.main.pressure,
        humidity: data.data.main.humidity,
        wind: data.data.wind.speed,
        offset: data.data.timezone,
        imageName: imageName,
        isHidden: false,
        index: 5,
      };
      isSelected(newObj);
    }
    cityRef.current.value = "";
  };
  //triggers the enter button
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      getInfoHandler(cityRef.current.value);
    }
  };
  //selects a loaction
  const selectHandler = (name) => {
    const data = placesArray.find((place) => place.name === name);
    isSelected(data);
  };
  //chnage the array wrt to any function used
  useEffect(() => {
    if (placesArray) {
      if (showHidden) {
        setNewArray([...placesArray]);
        isSelected(placesArray[0]);
      } else {
        const nArray = placesArray.filter((place) => place.isHidden !== true);
        isSelected(nArray[0]);
        setNewArray([...nArray]);
      }
    }
    // eslint-disable-next-line
  }, [placesArray, showHidden]);
  const hiddenHandler = () => {
    setShowHidden((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search a City"
          ref={cityRef}
          onKeyPress={handleKeypress}
        />
        <BiSearchAlt
          onClick={() => {
            getInfoHandler(cityRef.current.value);
          }}
        />
      </div>
      <div className={styles.options}>
        {curData && (
          <AiOutlinePlus
            onClick={() => {
              addPlaceHandler();
              setShowMenu(false);
            }}
          />
        )}
        {placesArray.length > 0 && curData && (
          <AiOutlineDelete onClick={deleteHandler} />
        )}
        {curData && curData.isHidden && (
          <AiOutlineEyeInvisible onClick={hideUnhideHandler} />
        )}
        {curData && !curData.isHidden && (
          <AiOutlineEye onClick={hideUnhideHandler} />
        )}
        {undoArray.length > 0 && <AiOutlineUndo onClick={undoHanlder} />}
      </div>
      <div className={styles.myPlaces}>
        <div className={styles.title}>My Places</div>
        <div className={styles.allPlaces}>
          {newArray.length === 0 && (
            <div>No Places.Please search a place and press the add button</div>
          )}
          {newArray.map((place) => (
            <div
              className={
                place.name === curData.name ? styles.selected : styles.places
              }
              onClick={() => {
                selectHandler(place.name);
              }}
            >
              {place.name}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.actions}>
        <button
          onClick={() => {
            setNewArray([]);
            resetHandler();
            setShowMenu(false);
          }}
        >
          Reset All
        </button>
        <button onClick={hiddenHandler}>
          {showHidden ? "Hide Hidden" : "Show Hidden"}
        </button>
      </div>
    </div>
  );
};

export default MenuList;
