import {Route,Routes} from 'react-router-dom';
import {useState,useEffect} from 'react';
import style from "./App.module.css";
import Frontpage from './frontpage/frontpage.js';
import MainPage from './mainPage/mainpage.js';
import logo from "./logoweather.png";
import { useNavigate} from "react-router-dom";


const dataKey = process.env.REACT_APP_WEATHER_API_KEY;
const MY_KEY = process.env.REACT_APP_IMAGE_KEY;

function App() {
  // general app function for parent
  const [heightDynamic, setHeightDynamic] = useState("");
  const [widthDynamic, setWidthDynamic] = useState("");
  const [userInputFinal, setUserInputFinal] = useState("");
  const [fullWeatherRawData, setFullWeatherRawData] = useState();
  const [pictureRawHolder, setPictureRawHolder] = useState(logo);

  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();
  

  // console.log(userInputFinal)

  function updateInput(state) {
    setUserInputFinal(state);
  }

  function updateFullWeatherRawData(state) {
    setFullWeatherRawData(state);
  }

  function updateClicked(state) {
    setClicked(state);
  }

  // console.log(userInputFinal)
  const [letTrue, setLetTrue] = useState(false);

  // testing
  const [toggling, setToggling] = useState(false);
  const togglingWork = (state) => {
    setToggling(state);
  };
  // end of testing

  useEffect(() => {
    if (fullWeatherRawData === null || fullWeatherRawData === undefined) {
      setLetTrue(false);

      setTimeout(() => {
        setLetTrue(true);
        console.log("im ready");
      }, 500);
      // console.log(fullWeatherRawData);

      // testing
      // setToggling(true);
      console.log(`no value`);
      //end testing
    } else {
      setLetTrue(true);
      navigate("/mainPage");
    }
  }, [fullWeatherRawData, navigate]);

  function clickThrough() {
    updateClicked(true);
  }

  useEffect(() => {
    function heightChange() {
      setHeightDynamic(window.innerHeight);
    }
    window.addEventListener("resize", heightChange);
    heightChange();
    // console.log(heightDynamic);
  }, [heightDynamic]);

  useEffect(() => {
    function widthChange() {
      setWidthDynamic(window.innerWidth);
    }
    window.addEventListener("resize", widthChange);
    widthChange();
  }, [widthDynamic]);

   
  
   useEffect(() => {
     async function weatherData() {
       const dataURL = `https://api.weatherapi.com/v1/forecast.json?key=${dataKey}&q=${userInputFinal}&days=4&aqi=no&alerts=no`;

       try {
         const response = await fetch(`${dataURL}`);
         if (response.ok) {
           const data = await response.json();
           // console.log(response);
           setFullWeatherRawData(data);
         } else {
           console.log("bitch move aside");
           //  setUserInputFinal('nulle');
           setFullWeatherRawData(null);
           setToggling(true);
         }
       } catch (err) {
         console.log("weather ApI problem");
       }
     }
     if (clicked) {
       weatherData();
       setClicked(false);
     }
   }, [clicked, fullWeatherRawData, userInputFinal]);
  //  console.log(fullWeatherRawData);
  useEffect(() => {
    const imageURL = `https://api.unsplash.com/search/photos?query=${userInputFinal}&client_id=${MY_KEY}`;

    async function fetchImageAPI() {
      const response = await fetch(`${imageURL}`);
      const data = await response.json();

      setPictureRawHolder(data.results[0].urls.raw);
    }

    if (clicked) {
      fetchImageAPI();
    }
  }, [clicked, pictureRawHolder, userInputFinal]);

  //put it back to use the data
  // useEffect(() => {
  //   if (fullWeatherRawData === undefined) {
      
  //     const refreshWeatherData = window.localStorage.getItem("weatherData");

  //     setFullWeatherRawData(JSON.parse(refreshWeatherData));
      
  //   }

  //   if (performance.navigation.type == 1) {
  //     location.href = "https://www.google.com";
  //   } else {
  //     console.log("Not reloaded");
  //   }
  // }, []);
  // // saving data to localStorage
  // useEffect(() => {
  //   if (fullWeatherRawData !== undefined) {
  //     window.localStorage.setItem(
  //       "weatherData",
  //       JSON.stringify(fullWeatherRawData)
  //     );
  //   }
  // });
  
  // /////////////////// change this address to redirect to you localhost when you refresh the page
  function checkEvt() {
    var evTypep = window.performance.getEntriesByType("navigation")[0].type;
    if (evTypep === "reload") {
      window.location.replace("http://localhost:3001/");
    }
  }
  checkEvt();
////////////////////////////////////////////////////////////////

  return (
    <div className={style.App}>
      {/* <BrowserRouter> */}
      <Routes>
        <Route
          path="/"
          element={
            <Frontpage
              updateInput={updateInput}
              fullWeatherRawData={fullWeatherRawData}
              updateFullWeatherRawData={updateFullWeatherRawData}
              updateClicked={updateClicked}
              userInputFinal={userInputFinal}
              letTrue={letTrue}
              clickThrough={clickThrough}
              toggling={toggling}
              togglingWork={togglingWork}
            />
          }
        ></Route>

        <Route
          path="/mainPage"
          element={
            <MainPage
              fullWeatherRawData={fullWeatherRawData}
              pictureRawHolder={pictureRawHolder}
              updateInput={updateInput}
              updateFullWeatherRawData={updateFullWeatherRawData}
            />
          }
        ></Route>
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
