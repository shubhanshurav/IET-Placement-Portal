import React, {  useState } from "react";
import "../Styles/Common.css";
import Sidebar from "../components/Sidebar";
import user from "../Assets/user_profile.png";
import search from "../Assets/search.png";
import "../Styles/Company.css";
// import dummy from "../Assets/dummy.png";
import company_logo from '../Assets/company_logo.png';
import {useNavigate} from 'react-router-dom';
import { companiesList } from "../data/companyList";

const Company = () => {
  
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);
  const [isSidebarVisible, setSidebarVisibility] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  function searchItem(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  const navigate = useNavigate();

  const handleClick = (data)=>{
    navigate("/students",{
      state:{
        company_selected:{data},
      }
    })
  }
  return (
    <div className="student_div">
      {isSidebarVisible && <Sidebar param={"companies"} />}
      <div className="student_div_center">
        <div className="dashboard_top student_searchbar">
          {/* Toggle Button */}
          <button className=" top-80 left-0 p-[2px] z-10 ml-[-5.5rem] text-white text-2xl bg-richblack-800 rounded"
           onClick={toggleSidebar}>
              {isSidebarVisible ? "✖️":"♒"}
          </button>
          <div className="search_bar_div">
            <input
              className="search_bar"
              type="text"
              placeholder="Seach Companies, Internships, Hackathons, or Students..."
              onChange={(e) => setQ(e.target.value)} value={q}
            />
            <div className="search_icon_div">
              <img src={search} alt="pic" className="search_icon" />
            </div>
          </div>
        </div>
        <div className="dashboard_bottom">
          <div className="card-container1">
          <h1 className="companies_title font-bold text-3xl">List of companies that visit our campus</h1>
            <div className="cards1">
              {searchItem(companiesList).length>0?searchItem(companiesList).map((item, index) => {
                return (
                  <div key={index} className="card1" onClick={(e)=>{handleClick(item.name)}}>
                    <div className="company_logo_div">
                      <img src={item.icon} alt="pic" className="company_logo" />
                    </div>
                      <p className="company_logo_name">{item.name}</p>
                  </div>
                )
              })
              :
              <div className='center_div'>
                <h3 className='no_Records no_records_company text-2xl'>No Records Found!</h3>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company;
