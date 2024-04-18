import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import '../Styles/Common.css';
import '../Styles/Student.css';
import Sidebar from '../components/Sidebar';
// import user from '../Assets/user_profile.png';
import search from '../Assets/search.png';
// import icon1 from '../Assets/avatar.jpg';
// import dummy from '../Assets/dummy.jpg';
import InternshipLoader from './InternshipLoader';
import '../Styles/InternshipLoader.css';
import { useLocation } from 'react-router-dom'
import sort from '../Assets/sort.png';
import check from '../Assets/check.png';
import {placedStudentDetails} from '../data/placedstudentData';
import { ImMenu, ImCross } from "react-icons/im";


// const URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=J4YbeO4oJvIIZuxRal7VD349eP0phxSaaTmrPTMu4mqIz3ZbYFx93F9YiXBuiaFBL2yYPiu5UcihxZh54imjzKiMZaA2b5zVm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCm_1kVhFXvHREi5EbChZ8bP0owEZxE-0PS3iwwP25utDTAz1RiYZaqp_4rA5QWQaSbggJk4C1L2JL1Hb041VPOQ7kzyZdT-5Q&lib=Mu7cgZbbJR3Jsd9m20phPH86idZU4jP8o';


const Student = ({ data }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  // console.log(" data = ",data);
  const [placedData, setPlacedData] = useState(placedStudentDetails)

  const [q, setQ] = useState("");

  useEffect(() => {
    setQ(location.state ? location.state.company_selected.data : "");
  }, [])

  const [check_flag, setCheckFlag] = useState(0);
  const [showDiv, setShowDiv] = useState(false);

  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  const SortbyName = () => {
    data.sort((a, b) => {
      if (a.Name < b.Name) {
        return -1;
      } else if (a.Name > b.Name) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  const SortbyYear = () => {
    data.sort((a, b) => {
      if (a.Year > b.Year) {
        return -1;
      } else if (a.Year < b.Year) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  const SortbyPackage = () => {
    data.sort((a, b) => {
      if (a.Package > b.Package) {
        return -1;
      } else if (a.Package < b.Package) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  const handleCheck1 = (e) => {
    setCheckFlag(e);
    SortbyName();
    setShowDiv(!showDiv);
  }
  const handleCheck2 = (e) => {
    setCheckFlag(e);
    SortbyYear();
    setShowDiv(!showDiv);
  }
  const handleCheck3 = (e) => {
    setCheckFlag(e);
    SortbyPackage();
    setShowDiv(!showDiv);
  }

  const [searchParam] = useState(["Name", "Company", "Skills", "Year"]);

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
 
  return (
    <div className='student_div'>
      {isSidebarVisible && <Sidebar param={'students'} />}
      <div className="student_div_center w-[96%] m-auto">
        <div className="">
           {/* Toggle Button */}
            <button className="pt-2 z-10 ml-[11rem] md:ml-[13rem] text-white text-2xl bg-richblack-800 rounded"
            onClick={toggleSidebar}>
                {isSidebarVisible ? <ImCross /> : <ImMenu />}
            </button>
        </div> 
        <div className="dashboard_top student_searchbar ">
          <div className="search_bar_div ">
            <input className='search_bar' onChange={(e) => setQ(e.target.value)} value={q} type='text' placeholder='Seach Companies, Students, or Skills ...' />
            <div className="search_icon_div">
              <img src={search} alt="pic" className="search_icon" />
            </div>
          </div>
          <div className='sort_div'>
            <p className='sort_name' onClick={() => { setShowDiv(!showDiv) }}>sort by</p>
            <img src={sort} className='sort_img' alt="sortIMG" onClick={() => { setShowDiv(!showDiv) }} />
            <div className={showDiv ? 'sort_dropdown' : 'sort_dropdown_none'}>
              <ul className='sort_ul'>
                <li className='sort_li' onClick={(e) => { handleCheck1(1) }}>
                  Name &#42779;
                  <img src={check} alt="img" className={check_flag === 1 ? 'check_img' : "check_img_none"} />
                </li>

                <li className='sort_li' onClick={(e) => { handleCheck2(2) }}>
                  Year &#42780;
                  <img src={check} alt="img" className={check_flag === 2 ? 'check_img' : "check_img_none"} />
                </li>

                <li className='sort_li' onClick={(e) => { handleCheck3(3) }}>
                  Package &#42780;
                  <img src={check} alt="img" className={check_flag === 3 ? 'check_img' : "check_img_none"} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="dashboard_bottom_student">
          <div className='center_div'>

            {/* {data.length > 0 ? */}
            {placedData?.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 content-start">
                {searchItem(placedData)?.length > 0 ? searchItem(placedData).map((item, i) => {
                  // data.map((item, i) => {
                  console.log(searchItem(placedData));
                  const { UID, Name, Company, Jobprofile, Package, ProfileLink, Year } = item;
                  const ID = UID;
                  // const profileImg = ProfileLink.slice(33,);
                  // console.log(Name,profileImg);
                  return (
                    // <div className="card" key={i} onClick={()=>{navigate(`/students/${item.name}`)}}>
                    <a href={`/students/${ID}`} className="card md:max-w-[33%] max-w-[100%] min-w-[275px]" key={i}>
                      <div className='year_field text-[#beb9b9] bg-[#2c25ffcc]'>{Year}</div>
                      {/* {profileImg ?
                        <img src={`https://drive.google.com/thumbnail?id=${ProfileLink.slice(33,)}`}
                          className="card_img" alt='Not Found' />
                        : <img src={dummy} alt="pic" className="card_img" />} */}
                        <img src={ProfileLink} className="card_img" alt='Not Found' />
                      <div className='card-details h-[200px] md:h-[210px]'>
                        <p className="card_student_name pt-[20px]">{Name}</p>
                        <p className="card_company_name pt-[5px]">{Company}</p>
                        <p className="card_company_role pt-[5px]"><span className='card_span'>Role:</span> {Jobprofile}</p>
                        <p className="card_student_skills py-[5px]"><span className='card_span'>Package :</span>  {Package} LPA</p>
                      </div>
                    </a>
                  )
                })
                  :
                  <div className='center_div'>
                    <h3 className='no_Records text-2xl'>No Records Found!</h3>
                  </div>
                }
              </div>
              :
              <div className='loading_div'>
                <InternshipLoader />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Student