// for frontpage extentsion
import logo from "../logoweather.png";
// End of frontpage extension
import { useState, useEffect } from "react";
import style from "./frontpage.module.css";
import {useNavigate} from "react-router-dom";

function Frontpage( {userInput,updateInput}) {
  // general app function for parent
  const [heightDynamic, setHeightDynamic] = useState("");
  const [widthDynamic, setWidthDynamic] = useState("");

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

  // first page function
  const [toggling, setToggling] = useState(false);

  function getUserInput() {
    if (userInput === "") {
      console.log(`no value`);
      setToggling(true);
      console.log(toggling);
    } else {
      console.log("hello there");
         navigate("/mainPage");
    }
  }

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
          <input
            type="text"
            placeholder="enter your location"
            value={userInput}
            onChange={(e) => {
              updateInput(e.target.value);
            }}
            className={`${style.inputUserInput} ${
              toggling ? style.errorMsg : style.removeErrorMsg
            }`}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                getUserInput();
              }
            }}
            onTransitionEnd={() => setToggling(false)}
          />

          <button
            onClick={() => {
              getUserInput();
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
