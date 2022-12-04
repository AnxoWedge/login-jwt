// Tanto o header como o footer São quase meramente "dumb" não tem state e apenas servem para estilos.

import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faGithub, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'



//CSS
import "./../css/header.css"


//images
import logo from './../assets/logoatla.png'

library.add( fab, faGithub,faInstagram, faLinkedin,faYoutube)

const Header = ({ title }) => {
  const [token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken("null");
    localStorage.removeItem("apiToken");
  };

  return (
  <>
    <div className="header">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <ul className="socials">
          <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/AnxoWedge/login-jwt"><FontAwesomeIcon style={{'height':'2.3em'}} icon={faGithub} /></a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/angelotheguy/"><FontAwesomeIcon style={{'height':'2.3em'}} icon={faInstagram} /></a></li>
          <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/%C3%A2ngelo-cunha-a14a99151/"><FontAwesomeIcon style={{'height':'2.3em'}} icon={faLinkedin} /></a></li>
        </ul>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="svg-settings">
          <defs>
            <linearGradient id="radial" gradientTransform="rotate(45)">
              <stop className="radialStop1" offset="0%" color='#b38b20'></stop>
              <stop className="radialStop2" offset="100%" color='#2069d6'></stop>
            </linearGradient>
          </defs>
        </svg>
      <div className="button-box">
        {token==="null" ? "": (
          <button className="button action" onClick={handleLogout}>
            Logout
          </button>
          )}
      </div>

    </div>
    

  </>
  );
};

export default Header;
