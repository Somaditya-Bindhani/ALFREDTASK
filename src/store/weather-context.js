import React, { createContext, useState, } from "react";

const WeatherContext = createContext({
  curData: {},
  placesArray: [],
  addPlaceHandler: () => {},
  isSelected: (dataobj) => {},
  hideUnhideHandler: () => {},
  deleteHandler: () => {},
  resetHandler: () => {},
  undoHanlder: () => {},
  undoArray:[]
});
export const AuthContextProvider = (props) => {
  const [curData, setCurData] = useState();
  const [placesArray, setPlacesArray] = useState([]);
  const [undoArray, setUndoArray] = useState([]);

  const addPlaceHandler = () => {
    const place = placesArray.find((place) => place.name === curData.name);
    if (place) {
      alert(`You have Already Added ${place.name}.`);
      return;
    }
    setPlacesArray((prev) => [...prev, curData]);
  };
  const isSelected = (dataObj) => {
    setCurData(dataObj);
  };
  const hideUnhideHandler = () => {
    if (curData.isHidden) {
      setCurData({ ...curData, isHidden: false });
      setPlacesArray((prev) =>
        prev.map((place) =>
          place.name === curData.name ? { ...place, isHidden: false } : place
        )
      );
    } else {
      setCurData({ ...curData, isHidden: true });
      setPlacesArray((prev) =>
        prev.map((place) =>
          place.name === curData.name ? { ...place, isHidden: true } : place
        )
      );
    }
  };
  const deleteHandler=()=>{
    const newObj = placesArray.find(place=>place.name === curData.name);
    const newArray = placesArray.filter(place=>place.name !== curData.name);
    setPlacesArray([...newArray]);
    setUndoArray([...undoArray,newObj])
  }
  const resetHandler=()=>{
    setPlacesArray([]);
    setCurData(null);
  }
  const undoHanlder=()=>{
    const newObj = undoArray.pop();
    setPlacesArray([...placesArray,newObj]);
  }
  const contextValue = {
    curData,
    placesArray,
    addPlaceHandler,
    isSelected,
    hideUnhideHandler,
    deleteHandler,
    resetHandler,
    undoHanlder,
    undoArray
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {props.children}
    </WeatherContext.Provider>
  );
};
export default WeatherContext;
