// Este Ficheiro é para a autorização e verificação do token disponível para o utilizador. 
// Caso o token for Válido é guardo no state

import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("apiToken"));

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token, // o header necessário para a autorização. Mais tarde teremos de separa o token do Bearer no backend
        },
      };

      const response = await fetch("/api/me", requestOptions); 

      if (!response.ok) {
        setToken(null);
      }
      localStorage.setItem("apiToken", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
