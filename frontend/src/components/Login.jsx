//Formulário de Login

import React, { useState, useContext } from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";

//CSS
import "./../css/forms.css";

const Login = () => {
  // State com React Hooks para o processamento dos dados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setError] = useState(UserContext);
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email: email, password: password }),// tratamento do JSON para o backend 
    };

    const response = await fetch("/api/login", requestOptions);// Envio dos dados para o back end 
    const data = await response.json();

    if (!response.ok) { // se existir um erro 
      setErrorMessage(data.message);
      setError("error")
    } else {
      setToken(data.token);
      setError("success")
    }
  };

  const handleSubmit = (e) => { // Função de  para fazer Login
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="column">
      <form className="box bg-colour" onSubmit={handleSubmit}>
        <div className="underlay"></div>
        <h1 className="title has-text-centered">Login</h1>
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button action" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
