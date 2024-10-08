import React, { useState, useEffect } from "react";
import "../Styles/Common.css";
import Sidebar from "./Sidebar";
import HackathonCard from "./HackathonCard";
import user from "../Assets/user_profile.png";
import search from "../Assets/search.png";
import "../Styles/Hackathon.css";
import HackathonLoader from "./HackathonLoader";
import { ImMenu, ImCross } from "react-icons/im";
import Navbar from "./Navbar";

const Hackathon = ({ hackathonsData, loading }) => {
  const [q, setQ] = useState("");
  const [searchParam] = useState(["title", "description", "deadline"]);

  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  // console.log("Mil Gya bro data", hackathonsData);

  function searchItem(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  // const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="bg-[#000000] z-10 flex flex-row">
        <div className="flex">
          {/* Toggle Button */}
          <button
            className="z-10 pt-2 px-4 bg-[#000000] text-white text-2xl bg-richblack-800"
            onClick={toggleSidebar}
          >
            {isSidebarVisible ? <ImCross /> : <ImMenu />}
          </button>
        </div>

        <div className="">
          <Navbar ShowBtn={true} />
        </div>
      </div>
      <div className="student_div">
        {isSidebarVisible && <Sidebar param={"hackathons"} />}
        <div className="student_div_center w-[94%] m-auto">
          <div className="dashboard_top student_searchbar">
            <div className="search_bar_div">
              <input
                className="search_bar"
                type="text"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                }}
                placeholder="Seach Companies, Internships, Hackathons, or Students..."
              />
              <div className="search_icon_div">
                <img src={search} alt="pic" className="search_icon" />
              </div>
            </div>
          </div>
          <div className="dashboard_bottom hackthon_div m-auto">
            {/* <div className='hackathon_title_up'>
              <h3 className='heading_ text-white font-extrabold text-3xl'>Upcoming Hackathons...</h3>
            </div> */}
            <div className="hackthon_class card-container grid grid-cols-1 md:grid-cols-3 gap-2 m-auto py-10">
              {/* {loading || hackathonsData.length === 0 ?
                <HackathonLoader /> :
                hackathonsData && searchItem(hackathonsData).length > 0 ? searchItem(hackathonsData).map((item, i) => {
                  return <HackathonCard hackathons={item} key={i} />;
                }) */}
              {
                loading || (hackathonsData && hackathonsData.length > 0) ? (
                  searchItem(hackathonsData).map((item, i) => {
                    return <HackathonCard hackathons={item} key={i} />;
                  })
                ) : (
                  // <div className='center_div'>
                  <h3 className="text-xl font-bold text-red-500">
                    No Records Found!
                  </h3>
                )
                // </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hackathon;

// {Array.isArray(hackathonsData) && hackathonsData.length > 0 ? (
//   searchItem(hackathonsData).map((item, i) => {
//     return <HackathonCard hackathons={item} key={i} />;
//   })
// )
