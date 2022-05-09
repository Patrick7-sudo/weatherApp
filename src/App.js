// for frontpage extentsion
import logo from "./logoweather.png"
// End of frontpage extension
import {useState,useEffect} from 'react';
import style from "./App.module.css"
function App() {
  // general app function for parent
  const [heightDynamic,setHeightDynamic]=useState("");

  useEffect(()=>{
    function heightChange(){
      setHeightDynamic(window.innerHeight)
    }
    window.addEventListener("resize",heightChange);
    heightChange();
  },[heightDynamic])
  console.log(heightDynamic)
  // first page function
  const [userInput, setUserInput] =useState("");
  // end of first page function 
  console.log(userInput)
  return (
    <div className={style.App} style={{ height: `${heightDynamic}px` }}>
      {/* this is 1st page */}
      <div className={style.frontPageMainContainer}>
        
          <div className={style.logoContainer}>
            <img src={logo} alt="logo" className={style.logoItSelf}/>
          </div>
          <div className={style.userInput}>
            <input
              type="text"
              placeholder="enter your location"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              className={style.inputUserInput}
            />

            <button className={style.buttonUserInput}>Enter</button>
          </div>
          <div className={style.wave}>
            <div className={style.waveContain}></div>
          </div>
        
      </div>
      {/* This is the end of 1st page */}
    </div>
  );
}

export default App;
