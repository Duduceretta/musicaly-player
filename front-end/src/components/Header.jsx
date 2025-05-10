import React from "react";
import logoMusicaly from "../assets/logo/musicaly-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logoMusicaly} alt="" />
      </Link>

      <Link to="/" className="header__link">
        <h1>Musicaly</h1>
      </Link>
    </div>
  );
};

export default Header;
