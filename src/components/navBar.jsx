import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../services/userService";
import GetFontAwesomeIcon from "./common/getFontAwesomeIcon";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Filmy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/movies">
              Movies
            </NavLink>
            {user.name ? (
              <React.Fragment>
                <button
                  className="btn btn-success"
                  onClick={async () => {
                    await logout();
                    window.location = "/";
                  }}
                >
                  Logout
                </button>
                <NavLink className="nav-item nav-link" to="/profile">
                  {user.name}
                </NavLink>
                {user.admin ? (
                  <GetFontAwesomeIcon
                    type="solid"
                    icon="asterisk"
                    style={{ color: "orange", fontSize: 20 }}
                  />
                ) : null}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
