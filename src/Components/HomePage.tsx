import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./HealthCareContext/HealthCareContext";
import { USER_AUTH_LOCAL_STORAGE } from "../utils/constants";
import './HomePage.css';
import Sidebar from "./Sidebar/CustomNavbar";
import { Navbar } from "react-bootstrap";
import CustomNavbar from "./Sidebar/CustomNavbar";

export const HomePage = () => {
  const { userAuth, setUserAuth } = useContext(UserContext);



  const logout = () => {
    const loggedOut = { email: "", role: "", token: "", isFirstLogin: false };
    localStorage.setItem(USER_AUTH_LOCAL_STORAGE, JSON.stringify(loggedOut));
    setUserAuth(loggedOut);
  };

  return (
    <div className="homepage">
      <CustomNavbar />
      <div className="container text-center mt-5">
        <h1 className="title">Welcome to HealthCare</h1>
        <h4>
          Welcome <b>{userAuth.email}</b>. Your role is <b>{userAuth.role}</b>.
        </h4>
      
        <div className="button-container">
          {/* <Link to="/patients" className="btn btn-primary">
            Patients
          </Link>
          <Link to="/doctors" className="btn btn-primary">
            Doctors
          </Link>
          <Link to="/acceptances" className="btn btn-primary">
            Acceptances
          </Link> */}
          <button className="btn btn-secondary logout-btn position-absolute top-0 end-0 m-4" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};