import React from "react";


//CSS
import "./../css/footer.css"

const Header = () => {
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

export default Header;
