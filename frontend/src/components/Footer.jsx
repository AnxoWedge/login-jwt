// Tanto o header como o footer São quase meramente "dumb" não tem state e apenas servem para estilos.
import React from "react";


//CSS
import "./../css/footer.css"

const Footer = () => {
  return (
  <>
    <div className="footer bg-colour">
      <div className="copy">
        <span>GSC &copy; {new Date().getFullYear()} All rights reserved;</span> 
        <span>Developed by<br/> Ângelo Cunha = 20202537;<br/> José Gonçalves = 20202462;<br/> Luís Fernandes = 20202586;</span>
      </div>
    </div>

  </>
  );
};

export default Footer;
