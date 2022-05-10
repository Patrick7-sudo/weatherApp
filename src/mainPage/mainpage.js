import style from './mainPage.module.css'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
function MainPage(){
    const [heightDynamic, setHeightDynamic] = useState("");
    const [widthDynamic, setWidthDynamic] = useState("");
    const [pictureHolder,setPictureHolder]= useState("");

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
          const imageURL = `https://api.unsplash.com/search/photos?query=kuala lumpur&client_id=W8eufYA5_Eqz0VfH7mFvhgFCRUv88AuhShK4lttkZAs`;
         async function fetchImageAPI() {
           const response = await fetch(`${imageURL}`);
           const data = await response.json();

           setPictureHolder(data.results[0].urls.raw);
         }
         fetchImageAPI()
     },[])

    return (
      <div
        className={style.mainFrame}
        style={{ height: `${heightDynamic}px`, width: `${widthDynamic}px` }}
      >
        <div className={style.todayDisplayContainer}>
          <div className={style.todayDisplayMain}>
            <img src={pictureHolder} alt="city selected" />
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
                  <p className={style.todayInfoDate}>18 August 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.allWeekWeatherContainer}>
          <h1>all weather </h1>
        </div>
        <div className={style.returnContainer}>
          <button onClick={()=>{returnToMainPage()}}className={style.buttonReturn}>
            Return
          </button>
        </div>
      </div>
    );
}

export default MainPage;