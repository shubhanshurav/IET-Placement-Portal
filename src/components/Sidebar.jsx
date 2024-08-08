import React, { useState } from "react";
import "../Styles/Sidebar.css";
import hackathon from "../Assets/code.png";
import internship from "../Assets/internship.png";
import company from "../Assets/company1.png";
import dashboard from "../Assets/dashboard2.png";
import student from "../Assets/profile.png";
// import logout from "../Assets/logout.png";
import home from "../Assets/home.png";
import logo from "../Assets/college.jpg";
import user from "../Assets/user.png";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ param }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar mt-[14%] md:mt-[8.5%] md:w-[18%] w-[65%] h-[100%]">
      <div className="border-[#f8b117] border-b-2 py-1">
        <p
          className="text-center"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img src={logo} alt="sidebar_logo" className="w-[90%] h-[100%] rounded-xl m-auto px-2" />
          <span className="font-bold text-[#bfc4c4] text-[1.4rem]">IET, Agra</span>
        </p>
      </div>
      <div className="sidebar_menu w-[100%] h-[60%] py-3">
        <ul className="sidebar_ul text-[20px] gap-3 font-[600]">
          <li
            className={
              param === "dashboard" ? "active sidebar_li" : "sidebar_li"
            }
            id="1"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <img src={dashboard} alt="" className="icon_img" />
            Dashboard
          </li>
          <li
            className={
              param === "students" ? "active sidebar_li" : "sidebar_li"
            }
            id="2"
            onClick={() => {
              navigate("/students");
            }}
          >
            <img src={student} alt="" className="icon_img" />
            Students
          </li>
          <li
            className={
              param === "companies" ? "active sidebar_li" : "sidebar_li"
            }
            id="3"
            onClick={() => {
              navigate("/companies");
            }}
          >
            <img src={company} alt="" className="icon_img" />
            Companies
          </li>
          <li
            className={
              param === "hackathons" ? "active sidebar_li" : "sidebar_li"
            }
            id="4"
            onClick={() => {
              navigate("/hackathons");
            }}
          >
            <img src={hackathon} alt="" className="icon_img" />
            Hackathons
          </li>
          <li
            className={
              param === "internship" ? "active sidebar_li" : "sidebar_li"
            }
            id="5"
            onClick={() => {
              navigate("/internship");
            }}
          >
            <img src={internship} alt="" className="icon_img" />
            Internships
          </li>
          <li
            className={
              param === "certificates" ? "active sidebar_li" : "sidebar_li"
            }
            id="6"
            onClick={() => {
              navigate("/certificates");
            }}
          >
            📑Certificates
          </li>
          <li
            className={param === "gate" ? "active sidebar_li" : "sidebar_li"}
            id="7"
            onClick={() => {
              navigate("/gate");
            }}
          >
            <img src={user} alt="" className="icon_img" />
            Gate Students
          </li>
        </ul>
      </div>
      <div className="logout_div">
        <button
          className="logout_btn"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={home} className="icon_img_home" alt="home_logo" />
          Home
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
