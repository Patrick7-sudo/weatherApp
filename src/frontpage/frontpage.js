// for frontpage extentsion
import logo from "../logoweather.png";
// End of frontpage extension
import { useState, useEffect } from "react";
import style from "./frontpage.module.css";

function InputStuff({
  toggling,
  togglingWork,
  getUserInput,
  userWork,
  userInputFinal,
  updateInput,
  clickThrough
}) {
  return (
    <input
      type="text"
      placeholder="enter your location"
      value={userInputFinal}
      onChange={(e) => {
        updateInput(e.target.value);
      }}
      className={`${style.inputUserInput} ${
        toggling ? style.errorMsg : style.removeErrorMsg
      }`}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          clickThrough();
        }
      }}
      onTransitionEnd={() => togglingWork(false)}
    />
  );
}

function Frontpage({
  
  fullWeatherRawData,
  updateFullWeatherRawData,
  updateClicked,
  userInputFinal,
  updateInput,
  working,
  clickThrough,
  // testing
  letTrue,
  toggling,
  togglingWork
}) {
  // general app function for parent
  const [heightDynamic, setHeightDynamic] = useState("");
  const [widthDynamic, setWidthDynamic] = useState("");
  // const [userInput, setUserInput] = useState("");
  // const navigate = useNavigate();

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

  // first page function
  // const [toggling, setToggling] = useState(false);
  // const togglingWork = (state) => {
  //   setToggling(state);
  // };


//  function getUserInput() { 
//     updateClicked(true);
//     console.log('sam smith')

//     if (userInputFinal === "") {
//       console.log(`no value`);
//       setToggling(true);
//       // updateFullWeatherRawData(null);
//     } else if (fullWeatherRawData === "") {
//       console.log("data not here");
//       console.log(userPlace);
//     } else {
//       console.log("hello there");
//       navigate("/mainPage");
//     } 
//   }

  // testing API calling
 
  // end of testing API calling
  
  // end of first page function

  return (
    <div className={style.frontPage} style={{ height: `${heightDynamic}px` }}>
      {/* this is 1st page */}
      <div
        className={style.frontPageMainContainer}
        style={{ width: `${widthDynamic}px` }}
      >
        <div className={style.logoContainer}>
          <img src={logo} alt="logo" className={style.logoItSelf} />
        </div>
        <div className={style.userInput}>
          <InputStuff
            // getUserInput={getUserInput}
            toggling={toggling}
            togglingWork={togglingWork}
            userInputFinal={userInputFinal}
            updateInput={updateInput}
            clickThrough={clickThrough}
          />

          <button
            onClick={() => {
              clickThrough();
            }}
            className={`${style.buttonUserInput}`}
          >
            Enter
          </button>
        </div>
        <div className={style.wave}>
          <div className={style.waveContain}></div>
        </div>
      </div>
      {/* This is the end of 1st page */}
    </div>
  );
}

export default Frontpage;
