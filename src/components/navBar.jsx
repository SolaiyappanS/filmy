import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../services/userService";
import Logo from "../logo.png";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt="Bootstrap"
            width="50"
            title="Filmy Movie Database"
          />{" "}
          FMDb
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
                  {user.admin ? (
                    <span style={{ color: "orange" }} title="Admin User">
                      *
                    </span>
                  ) : null}
                </NavLink>
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
