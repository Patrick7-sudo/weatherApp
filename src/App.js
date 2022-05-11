import {Route,Routes, BrowserRouter} from 'react-router-dom';
import {useState,useEffect} from 'react';
import style from "./App.module.css";
import Frontpage from './frontpage/frontpage.js';
import MainPage from './mainPage/mainpage.js';

const dataKey = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  // general app function for parent
  const [heightDynamic,setHeightDynamic]=useState("");
  const [widthDynamic,setWidthDynamic]=useState("");
  const [userInput, setUserInput] = useState("");
  // const [fullWeatherData,setFullWeatherData]=useState(null);
  
  const updateInput = (state) =>{
    setUserInput(state);
  }

  useEffect(()=>{
    function heightChange(){
      setHeightDynamic(window.innerHeight)
    }
    window.addEventListener("resize",heightChange);
    heightChange();
  },[heightDynamic])

   useEffect(() => {
     function widthChange() {
       setWidthDynamic(window.innerWidth);
     }
     window.addEventListener("resize", widthChange);
     widthChange();
   }, [widthDynamic]);

   useEffect(() => {
     const dataURL = `http://api.weatherapi.com/v1/forecast.json?key=${dataKey}&q=London&days=4&aqi=no&alerts=no

`;
     async function weatherData() {
      const response = await fetch(`${dataURL}`)
      const data = await response.json();
      console.log(data)
     }
     
     weatherData()
   }, []);
  
   return (
     <div className={style.App}>
       <BrowserRouter>
         <Routes>
           <Route
             path="/"
             element={
               <Frontpage userInput={userInput} updateInput={updateInput} />
             }
           ></Route>

           <Route
             path="/mainPage"
             element={<MainPage userInput={userInput} />}
           ></Route>
         </Routes>
       </BrowserRouter>
     </div>
   );
  
}

export default App;
