
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Home/Homepage";
import WeatherContext from './store/weather-context'
import { useContext} from "react";


function App() {
  // alert(calcTime("Bombay", "-18000"));
  // const [curData, setCurData] = useState();
  // const [placesArray, setPlacesArray] = useState([]);
  const weatherCtx = useContext(WeatherContext);
  const { curData } = weatherCtx;
  let link = "images/bg.jpg";
  if (curData) {
    link = `images/${curData.imageName}.jpg`;
  }

  // useEffect(() => {
  //   // if(placesArray){
  //   //   setCurData(placesArray[0]);
  //   // }
  //   console.log(placesArray);
  // }, [placesArray]);

  return (
    <div className="App">
      <div className="try"></div>
      <div
        className="try2"
        style={{
          backgroundImage: `url(${link})`,
        }}
      ></div>
      <Navbar />
      <Homepage />
    </div>
  );
}

export default App;
