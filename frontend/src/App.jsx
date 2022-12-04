import React, { useContext, useEffect, useState, useCallback } from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Starter from "./components/Starter";
import { UserContext } from "./context/UserContext";

// CSS
import "./css/global.css"

const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(true);
  const [background, setBackground] = useState("");

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch("/api", requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  // const bgChange = useCallback(()=>{
  //     setErrorMessage(prevError => !prevError)
  //   },[])
  //   if(errorMessage){
  //     setBackground("bg error")
  //   }
  //   else if(localStorage.getItem("apiToken")!== "null"){
  //     setBackground("bg success")
  //   }
  //   else{
  //     console.log(errorMessage)
  //     setBackground("bg")
  //   }

  return (
    <>
      <Header title={message} />
      <div className="columns bg">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {!token ? (
            <div className="columns">
              <Register  /> <Login  />
            </div>
          ) : (
            <Starter />
          )}
        </div>
        <div className="column"></div>
      </div>
      <Footer/>
    </>
  );
};

export default App;
