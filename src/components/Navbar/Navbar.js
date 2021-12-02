import React, {  useState } from "react";
import styles from "./Navbar.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import MenuList from "./MenuList";
const Navbar = ({ getInfoHandler,placesArray ,setPlacesArray,curData}) => {
  
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        Weather.<span>io</span>
      </div>
      <div>
        <BsThreeDotsVertical
          className={styles.icon}
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        />
      </div>
      {showMenu && (
        <MenuList
          // cityRef={cityRef}
          // handleKeypress={handleKeypress}
          getInfoHandler={getInfoHandler}
          setShowMenu={setShowMenu}
          placesArray={placesArray}
          setPlacesArray={setPlacesArray}
          curData={curData}
        />
      )}
    </div>
  );
};

export default Navbar;
