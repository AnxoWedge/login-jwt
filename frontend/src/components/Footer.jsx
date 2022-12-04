// Tanto o header como o footer São quase meramente "dumb" não tem state e apenas servem para estilos.
import React from "react";


//CSS
import "./../css/footer.css"

const Footer = () => {
  return (
  <>
    <div className="footer bg-colour">
      <div className="copy">
        GSC &copy; {new Date().getFullYear()} All rights reserved; Developed by Ângelo Cunha 20202537
      </div>
    </div>

  </>
  );
};

export default Footer;
