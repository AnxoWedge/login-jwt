// Realizado por: Ângelo Cunha 20202537
// App.jsx é o primeiro compoennete a ser executado e mostrado ao publico. este será o componente Central que conectará as diferentes secções do site
import React, { useContext, useEffect, useState, useCallback } from "react";

//importar os componentes
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Starter from "./components/Starter";
import { UserContext } from "./context/UserContext";

// Import do CSS
import "./css/global.css"

//Javascript do React
const App = () => {
  // React Hooks -> Criação de váriaveis e função para o uso do state mais flexivel 
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [background, setBackground] = useState("");

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };// Definir os headers 
    const response = await fetch("/api", requestOptions); // enviar os headers , Check inicial 
    const data = await response.json();

    if (!response.ok) {
      console.log("something messed up");
    } else {
      setMessage(data.message);// Receber o check do server
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


  //render do JSX ( HTML no Javascript)
  return (
    <>
      <Header title={message} />
      <div className="columns bg">
        <div className="column"></div>
        <div className="column m-5 is-two-thirds">
          {token==="null" ? (
            <div className="columns">
              <Register  /> <Login  />
            </div>
          ) : (
            <Starter />
          )}{console.log(token)}
        </div>
        <div className="column"></div>
      </div>
      <Footer/>
    </>
  );
};

export default App;
