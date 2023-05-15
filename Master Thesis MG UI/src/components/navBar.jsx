import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div>
          <Link className="navbar-brand h2 m-2" to="/home">
            Exxentric Admin Dashboard
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div
            className="navbar-nav"
            style={{ flex: 1, justifyContent: "center" }}>
            <NavLink className="nav-item nav-link" to="/forceChart">
              Force Plates
            </NavLink>
            <NavLink className="nav-item nav-link" to="/liveChart">
              Live data
            </NavLink>
            <NavLink className="nav-item nav-link" to="/workouts">
              Workouts
            </NavLink>
          </div>
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-item nav-link" to="/register">
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
