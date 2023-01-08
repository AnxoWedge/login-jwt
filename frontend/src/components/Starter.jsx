//Esta página está só disponível se tiver um token válido 

import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

import ProductList from "./ProductList";


const Starter = ({ title }) => {
  const [token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken("null");
    localStorage.removeItem("apiToken");
  };

  return (
    <div className="has-text-centered m-6">
      <h1 className="title">You're logged in! :)</h1>
      {token==="null" ? "": (
        <button className="button action" onClick={handleLogout}>
          Logout
        </button>
      )}
       <ProductList/> {/* Adiciona-se a product list para começar a chamada de items após o login */}
    </div>
  );
};

export default Starter;
