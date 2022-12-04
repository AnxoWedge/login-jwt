//Página de registo

import React, { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

//CSS
import "./../css/forms.css";


const Register = () => {
  // State com React Hooks para o processamento dos dados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setErrorMessageColor] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitRegistration = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password }), // tratamento do JSON para o backend 
    };

    const response = await fetch("/api/register", requestOptions);// Envio dos dados para o back end 
    const data = await response.json();

    if (!response.ok) { // verificar se houve erro 
      setErrorMessage(data.detail);
      setErrorMessageColor(true)
    } else {
      setToken(data.access_token); // Receber token em caso de sucesso 
    }
  };

  // Verificar se a password tem todos os requesitos
  const checkPassword = (pass) =>{
    let reg =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return reg.test(pass)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmationPassword && checkPassword(password)) { // comfirmação e Submit
      submitRegistration();
    } else {
      setErrorMessage(
        "Ensure that the passwords match and checks the following requirements: 8 letter password, with at least a symbol, upper and lower case letters and a number"
      );
    }
  };

  return (
    <div className="column">
      <form className="box bg-colour" onSubmit={handleSubmit}>
        <h1 className="title has-text-centered">Register</h1>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              type="text"
              placeholder="Enter Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
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
        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              type="password"
              placeholder="Enter password"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
              className="input"
              required
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage} />
        <br />
        <button className="button action" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
