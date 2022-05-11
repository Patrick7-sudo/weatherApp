import style from './mainPage.module.css'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import cloud from '../cloud.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import logo from "../logoweather.png"

const MY_KEY = process.env.REACT_APP_IMAGE_KEY;
// dynamic toggling function

const ToggleItem =(({input})=>{
    const [toggleInfo, setToggleInfo] = useState(false);

      function toggling() {
        if (toggleInfo) {
          setToggleInfo(false);
        } else {
          setToggleInfo(true);
        }
        console.log(toggleInfo);
      }

      function onLeaving(){
          
            setToggleInfo(false);
          
      }

    return (
      <div className={style.individualWeatherMain} onMouseLeave={()=>onLeaving()}>
        <div className={style.mainInfoWeatherMain}>
          <div className={style.logoContainerIndividual}>
            <img src={cloud} alt="weather logo condition"></img>
          </div>
          <div className={style.otherContainerIndividual}>
            <div className={style.tempContainerIndividual}>
              <p>
                {input} <span>&#176;</span>C
              </p>
            </div>
            <div className={style.otherInfoContainerIndividual}>
              <p>MONDAY</p>
              <p>18 September 2022</p>
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
            Precipitation: <span>71</span>%
          </p>
          <p>
            Humidity: <span>64</span>%
          </p>
          <p>
            Wind: <span>20.9</span> KM/h
          </p>
        </div>
      </div>
    );

})


// end of dynamic toggling function


function MainPage({userInput}){
    const [heightDynamic, setHeightDynamic] = useState("");
    const [widthDynamic, setWidthDynamic] = useState("");
    const [pictureHolder,setPictureHolder] = useState(logo);
    const [show,setShow] = useState(false);
    const Location = userInput;
    const dataDummy = [11, 2, 3, 4, 5, 6, 7];

    const navigate = useNavigate();

   
   
    

   

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

    function returnToMainPage(){
        navigate("/");
    }

     

     useEffect(()=>{
          const imageURL = `https://api.unsplash.com/search/photos?query=slovenia&client_id=${MY_KEY}`;

         async function fetchImageAPI() {
           const response = await fetch(`${imageURL}`);
           const data = await response.json();

           setPictureHolder(data.results[0].urls.raw);
         }
         fetchImageAPI()
     },[pictureHolder,Location])

      async function loadApp() {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            setShow(true);
            resolve();
          }, 1000);
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
        {show && (<div className={style.mainFrame}>
        <div className={style.todayDisplayContainer}>
          <div className={style.todayDisplayMain}>
            <img src={pictureHolder} alt="city selected" height="60px" />
            <div className={style.todayInfo}>
              <div className={style.todayInfoLocation}>
                <p>Kuala Lumpur, Malaysia</p>
              </div>
              <div className={style.todayInfoweatherNData}>
                <div className={style.todayInfoTemp}>
                  <p>
                    15 <span>&#176;</span>C
                  </p>
                </div>
                <div className={style.todayInfoOther}>
                  <p className={style.todayInfoCondition}>rain</p>

                  <p className={style.todayInfoDay}>Monday</p>
                  <p className={style.todayInfoDate}>18 September 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* end today main display with picture  */}
        {/*individual weather tiles  */}
        
        <div className={style.allWeekWeatherContainer}>
          {dataDummy.map((input) => {
            // console.log(input)
            return <ToggleItem input={input} />;
          })}
        </div>
        {/*end individual weather tiles  */}

        {/*return button  */}
        <div className={style.returnContainer}>
          <button
            onClick={() => {
              returnToMainPage();
            }}
            className={style.buttonReturn}
          >
            Return
          </button>
        </div>
        {/*end return button  */}
        </div>)}
      </div>
    );
}

export default MainPage;
