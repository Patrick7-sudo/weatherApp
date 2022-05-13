import style from './mainPage.module.css'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// dynamic toggling function


const ToggleItem =(({iconic,temp,minTemp,maxTemp,wind,humidity,rainChance,dateRaw})=>{
  const [toggleInfo, setToggleInfo] = useState(false);

  const [rawDateIndividual, setRawDateIndividual] = useState("2022-1-1");
   const [date,setDate] = useState([])
    const dateDay = date[0];
    const dateRest = date[1];
    //   end of data to use
    // converting date function
    function dateConverter(input) {
      let originalDate = input;
      const DateSeparate = originalDate.split("-");
      let realDate = DateSeparate[1] - 1;
      let date = new Date(DateSeparate[0], realDate, DateSeparate[2]);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      let longMonth = date.toLocaleDateString(undefined, options);
      const cutting = longMonth.split(",");
      const removeEmpty = cutting[1].slice(1);

      setDate([cutting[0], removeEmpty]);
    }

  function toggling() {
    if (toggleInfo) {
      setToggleInfo(false);
    } else {
      setToggleInfo(true);
    }
  }

  function onLeaving() {
    setToggleInfo(false);
  }
  
  useEffect(() => {
    setRawDateIndividual(dateRaw);
    dateConverter(rawDateIndividual);
  }, [dateRaw, rawDateIndividual]);
// console.log(rawDateIndividual);

  return (
    <div
      className={style.individualWeatherMain}
      onMouseLeave={() => onLeaving()}
    >
      <div className={style.mainInfoWeatherMain}>
        <div className={style.logoContainerIndividual}>
          <img src={iconic} alt="weather logo condition"></img>
        </div>
        <div className={style.otherContainerIndividual}>
          <div className={style.tempContainerIndividual}>
            <p>
              {temp} <span>&#176;</span>C
            </p>
          </div>
          <div className={style.otherInfoContainerIndividual}>
            <p>{dateDay}</p>
            <p>{dateRest}</p>
          </div>
          <div className={style.moreInfoLogoContainerIndividual}>
            <button
              onClick={() => {
                toggling();
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={`${
                  toggleInfo ? style.symbolItSelfCross : style.symbolItSelf
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${toggleInfo ? style.displayShow : style.hiddingThings} ${
          style.extraInfoWeatherMain
        }`}
      >
        <p>
          High: {maxTemp} <span>&#176;</span>C
        </p>
        <p>
          Low: {minTemp} <span>&#176;</span>C
        </p>
        <p>
          Precipitation: <span>{rainChance}</span>%
        </p>
        <p>
          Humidity: <span>{humidity}</span>%
        </p>
        <p>
          Wind: <span>{wind}</span> Kph
        </p>
      </div>
    </div>
  );
})


// end of dynamic toggling function


function MainPage({
  fullWeatherRawData,
  pictureRawHolder,
  updateInput,
  updateFullWeatherRawData,
}) {
  const [heightDynamic, setHeightDynamic] = useState("");
  const [widthDynamic, setWidthDynamic] = useState("");
  //   const [pictureHolder, setPictureHolder] = useState(pictureRawHolder);
  const [show, setShow] = useState(false);
  //   const [fullWeatherData, setFullWeatherData] = useState(fullWeatherRawData);

  let pictureHolder = pictureRawHolder;
  //   const [forecastWeatherData, setForecastWeatherData] = useState([]);
  const [nameLocation, setNameLocation] = useState("London");
  const [nameCountry, setNameCountry] = useState("United Kingdom");
  const [currentTemp, setCurrentTemp] = useState("--");
  const [feelsTemp, setFeelsTemp] = useState("--");
  const [conditionText, setConditionText] = useState("--");
  const [rawDate, setRawDate] = useState("2022-15-12");
  const [forecastStuff, setForecastStuff] = useState([11, 2, 3, 4, 5, 6, 7]);
  const navigate = useNavigate();

  const [fullWeatherData, setFullWeatherData] = useState(fullWeatherRawData);
  //    data to use
  useEffect(() => {
    // let fullWeatherData = fullWeatherRawData;
    setNameLocation(fullWeatherData.location.name);
    setNameCountry(fullWeatherData.location.country);
    setCurrentTemp(fullWeatherData.current.temp_c);
    setFeelsTemp(fullWeatherData.current.feelslike_c);
    setConditionText(fullWeatherData.current.condition.text);
    setRawDate(fullWeatherData.forecast.forecastday[0].date);
    setForecastStuff(fullWeatherData.forecast.forecastday);

    dateConverter(rawDate);
  }, [fullWeatherRawData, rawDate]);

  const [date, setDate] = useState([]);
  const dateDay = date[0];
  const dateRest = date[1];

  // converting date function
  function dateConverter(input) {
    let originalDate = input;
    const DateSeparate = originalDate.split("-");
    //because we start from 0 and not 1
    let realDate = DateSeparate[1] - 1;
    let date = new Date(DateSeparate[0], realDate, DateSeparate[2]);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    let longMonth = date.toLocaleDateString(undefined, options);
    const cutting = longMonth.split(",");
    const removeEmpty = cutting[1].slice(1);

    setDate([cutting[0], removeEmpty]);
  }

  //end of converting function

  useEffect(() => {
    function heightChange() {
      setHeightDynamic(window.innerHeight);
    }
    window.addEventListener("resize", heightChange);
    heightChange();
  }, [heightDynamic]);

  useEffect(() => {
    function widthChange() {
      setWidthDynamic(window.innerWidth);
    }
    window.addEventListener("resize", widthChange);
    widthChange();
  }, [widthDynamic]);

  function returnToMainPage() {
    navigate("/");
  }

  //end of data fetching


  async function loadApp() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        setShow(true);
        resolve();
      }, 2000);
    });
    await promise;
  }

  useEffect(() => {
    loadApp();
  }, []);

  if (!show) {
    return (
      <div className={style.loadingContainer}>
        <h2>Loading....</h2>
      </div>
    );
  }

  return (
    <div
      className={style.mainFrame}
      style={{ minHeight: `${heightDynamic}px`, width: `${widthDynamic}px` }}
    >
      {/*today main display with picture  */}
      {show && (
        <div className={style.mainFrame}>
          <div className={style.todayDisplayContainer}>
            <div className={style.todayDisplayMain}>
              <img src={pictureHolder} alt="city selected" height="60px" />
              <div className={style.todayInfo}>
                <div className={style.todayInfoLocation}>
                  <p>
                    {nameLocation}, {nameCountry}
                  </p>
                </div>
                <div className={style.todayInfoweatherNData}>
                  <div className={style.todayInfoTemp}>
                    <p>
                      {currentTemp}
                      <span>&#176;</span>C
                    </p>
                    <p className={style.todayInfoTempFeels}>
                      Feels like: {feelsTemp}
                      <span>&#176;</span>C
                    </p>
                  </div>
                  <div className={style.todayInfoOther}>
                    <p className={style.todayInfoCondition}>{conditionText}</p>

                    <p className={style.todayInfoDay}>{dateDay}</p>
                    <p className={style.todayInfoDate}>{dateRest}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* end today main display with picture  */}
          {/*individual weather tiles  */}

          <div className={style.allWeekWeatherContainer}>
            {forecastStuff.map((input, index) => {
              // console.log(input)
              return (
                <ToggleItem
                  iconic={input.day.condition.icon}
                  temp={input.day.avgtemp_c}
                  minTemp={input.day.mintemp_c}
                  maxTemp={input.day.maxtemp_c}
                  wind={input.day.maxwind_kph}
                  humidity={input.day.avghumidity}
                  rainChance={input.day.daily_chance_of_rain}
                  dateRaw={input.date}
                  key={index}
                />
              );
            })}
          </div>
          {/*end individual weather tiles  */}

          {/*return button  */}
          <div className={style.returnContainer}>
            <button
              onClick={() => {
                returnToMainPage();
                // updateInput("")
              }}
              className={style.buttonReturn}
            >
              Return
            </button>
          </div>
          {/*end return button  */}
        </div>
      )}
    </div>
  );
}

export default MainPage;
