import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logout, getUser } from "../services/userService";
import Logo from "../logo.png";

const NavBar = () => {
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    getUser().then((snap) => {
      if (snap) {
        setAdmin(snap.admin);
        setName(snap.name);
      } else {
        setAdmin(false);
        setName("");
      }
    });
  });
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" title="Filmy Movie Database">
          <img src={Logo} alt="Bootstrap" width="50" /> Filmy{" "}
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
          <div className="nav nav-pills">
            <NavLink className="nav-item nav-link m-1" to="/movies">
              All Movies
            </NavLink>
            <NavLink className="nav-item nav-link m-1" to="/mymovies">
              My Movies
            </NavLink>
          </div>
          {name ? (
            <div className="nav nav-pills ms-auto">
              <NavLink className="nav-item nav-link m-1" to="/profile">
                {name}
                {admin ? (
                  <span style={{ color: "orange" }} title="Admin User">
                    *
                  </span>
                ) : null}
              </NavLink>
              <div
                className="nav-item nav-link m-1 bg-danger active"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  await logout();
                  window.location = "/login";
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="nav nav-pills ms-auto">
              <NavLink className="nav-item nav-link m-1" to="/signup">
                Sign Up
              </NavLink>
              <NavLink
                className="nav-item nav-link bg-success active m-1"
                to="/login"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
