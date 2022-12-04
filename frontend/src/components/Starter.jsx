import React, { useContext } from "react";

import { UserContext } from "../context/UserContext";

const Starter = ({ title }) => {
  const [token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="has-text-centered m-6">
      <h1 className="title">You're logged in! :)</h1>
      {token && (
        <button className="button action" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Starter;
