import {Route,Routes, BrowserRouter} from 'react-router-dom';
import {useState,useEffect} from 'react';
import style from "./App.module.css";
import Frontpage from './frontpage/frontpage.js';
import MainPage from './mainPage/mainpage.js';

function App() {
  // general app function for parent
  const [heightDynamic,setHeightDynamic]=useState("");
  const [widthDynamic,setWidthDynamic]=useState("");
  const [userInput, setUserInput] = useState("");
  
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

           <Route path="/mainPage" element={<MainPage />}></Route>
         </Routes>
       </BrowserRouter>
     </div>
   );
  
}

export default App;
