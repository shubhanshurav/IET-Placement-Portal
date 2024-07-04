import React, { useEffect, useState } from "react";
import "../Styles/Common.css";
import "../Styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import user from "../Assets/user_profile.png";
import search from "../Assets/search.png";
import InternshipLoader from "./InternshipLoader";
import "../Styles/InternshipLoader.css";
import { Link, useNavigate } from "react-router-dom";
import dummy from "../Assets/dummy.jpg";
import toast, { Toaster } from "react-hot-toast";
// import { placedStudentDetails } from "../data/placedstudentData";
import { ImMenu, ImCross } from "react-icons/im";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, database } from "../firebaseConfig";
import { get, set, ref } from "firebase/database";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Dashboard({ data }) {
  const [authUser, setAuthUser] = useState(null);
  const [username, setUsername] = useState("");
  const [maxpackages, setPackages] = useState(null);
  const [placedData, setPlacedData] = useState([]);


  useEffect(() => {
    fetch(BASE_URL + '/placed')
      .then(response => response.json())
      .then(data => {
        // Assuming the structure is under responseDetails array
        if (data && data.responseDetails) {
          setPlacedData(data.responseDetails);
          // console.log(data.responseDetails)
        } else {
          console.error('Invalid data structure from API');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  // Get the current date
  let currentDate = new Date();

  // Extract the current year from the date object
  let currentYear = currentDate.getFullYear();

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUsername(user.email);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const [graphData, setGraphData] = useState({});
  const [stats, setStats] = useState([]);

  let jd_data = data.map((item) => {
    let jd = item["Jobprofile"];
    return jd.trim();
  });
  let unique_data = new Set(jd_data);
  const jdData = Array.from(unique_data);

  console.log(unique_data);

  const SortStudents = () => {
    // sort data
    data?.sort((a, b) => {
      if (a.Package > b.Package) {
        return -1;
      } else if (a.Package < b.Package) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const get_graph_data = async () => {
    const studentsRef = ref(database, "dashboard/maxPackages");
    const snapshot = await get(studentsRef);
    if (snapshot.exists()) {
      const packages_data = Object.values(snapshot.val());
      const date = new Date();
      let obj = [
        { name: date.getFullYear() - 5, value: packages_data[0].value1 },
        { name: date.getFullYear() - 4, value: packages_data[0].value2 },
        { name: date.getFullYear() - 3, value: packages_data[0].value3 },
        { name: date.getFullYear() - 2, value: packages_data[0].value4 },
        { name: date.getFullYear() - 1, value: packages_data[0].value5 },
      ];
      setGraphData(obj);
    } else {
      toast.error("Error Fecthing Graph Data!");
    }
  };
  const get_stats = async () => {
    const studentsRef = ref(database, "dashboard/statistics");
    const snapshot = await get(studentsRef);
    if (snapshot.exists()) {
      const res_data = Object.values(snapshot.val());
      setStats(res_data[0]);
    } else {
      toast.error("Error Fecthing Stats Data!");
    }
  };

  useEffect(() => {
    get_graph_data();
    get_stats();
  }, []);

  useEffect(() => {
    SortStudents();
  }, [data]);
  const navigate = useNavigate();

  const handleClick = (data) => {
    navigate("/students", {
      state: {
        company_selected: { data },
      },
    });
  };

  const date = new Date();
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="custom-label">{`Year : ${label} `}</p>
          <p className="custom-label">{`Max Package : ${payload[0].value} LPA`}</p>
        </div>
      );
    }

    return null;
  };
  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#ffffff"
        textAnchor="middle"
        dy={-6}
      >{`${value}`}</text>
    );
  };
  return (
    <div className="student_div">
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

      {isSidebarVisible && <Sidebar param={"dashboard"} />}

      <div className="student_div_center w-[90%] m-auto">
        {data?.length > 0 ? (
          <div className="dashboard_bottom_dashboard flex flex-col m-auto justify-between items-center">
            {/* Toggle Button */}
            <button
              className="z-10 ml-[-1rem] md:mr-[45rem] pt-2 text-white text-2xl bg-richblack-800 rounded"
              onClick={toggleSidebar}
            >
              {isSidebarVisible ? <ImCross /> : <ImMenu />}
            </button>
            <div className="dashboard_heading m-auto">
              <h2 className="dashboard_headingtext text-[1.7rem] md:text-[2rem] md:w-[100%] w-[60%] text-[#fff]">
                Welcome To Dashboard{" "}
                <span className="text font-normal text-2xl md:text-3xl">
                  {currentYear}
                </span>
              </h2>
              {authUser ? (
                <button
                  className="admin_profile"
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  <p className="admin_div">
                    <span className="admin_email text-sm text-[#f8b217] font-bold">
                      {username.slice(0, username.indexOf("@"))}
                    </span>
                    <Link to={"/admin"} className="admin_role">
                      Go to Dashboard
                    </Link>
                  </p>
                  <img src={user} className="admin_img" alt="admin_img" />
                </button>
              ) : (
                <button
                  className="w-fit flex justify-content-center items-center text-lg font-bold bg-blue-800 rounded-full px-2 md:px-3 py-1 hover:bg-blue-600"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <img src={user} alt="loginimg" className="admin_img" />
                  Login
                </button>
              )}
              {/* <button className="admin"><img src={user} className="user_img"/> Login</button> */}
            </div>
            <div className="flex_container1 flex flex-wrap">
              <div className="flex_item1 flex flex-col gap-3 md:gap-0 w-full md:w-[55%] h-fit md:h-[100%]">
                <div className="flex_item1-1 gap-2 flex w-full md:w-[90%] h-fit md:h-[100%] md:gap-0">
                  <div className="flex_item w-full md:w-[48%]">
                    <h3 className="dashboard_text">Total Students</h3>
                    <h2
                      id="total_student"
                      className="text-[1.5rem] md:text-[2rem]"
                    >
                      {stats.totalStudents}
                    </h2>
                  </div>
                  <div className="flex_item w-full md:w-[48%]">
                    <h3 className="dashboard_text">Placed Students</h3>
                    <h2
                      id="placed_student"
                      className="text-[1.5rem] md:text-[2rem]"
                    >
                      {stats.placedStudents}
                    </h2>
                  </div>
                </div>
                <div className="flex_item1-2 gap-2 flex w-full md:w-[90%] h-fit md:h-[100%] md:gap-0">
                  <div className="flex_item w-full md:w-[48%]">
                    <h3 className="dashboard_text">Total Companies</h3>
                    <h2
                      id="total_company"
                      className="text-[1.5rem] md:text-[2rem]"
                    >
                      {stats.totalCompanies}
                    </h2>
                  </div>
                  <div className="flex_item w-full md:w-[48%]">
                    <h3 className="dashboard_text">Average Package</h3>
                    <h2
                      id="avg_salary"
                      className="text-[1.5rem] md:text-[2rem]"
                    >
                      {stats.averagePackage} LPA
                    </h2>
                  </div>
                </div>
              </div>
              <div className="flex_item2 flex flex-col gap-3 md:gap-0 w-full md:w-[45%] h-fit md:h-[100%] mt-[12px] md:mt-0">
                <h3 className="dashboard_text">Job Profiles</h3>
                {/* {
                  data.slice(0, 3).map((item, index) => {
                    const { Name, Package, Company, UID } = item;
                    return (
                      <div key={index} className="highest_package draw meet" onClick={() => { navigate(`/students/${UID}`) }}>
                        <h3 className="highest_packagetext1">{Name.split(" ")[0] + " " + Name.split(" ")[Name.split(" ").length - 1]}<span className="highest_packagetext2">{Company}</span></h3>
                        <h3 className="highest_packagetext2 highest_packagetext3">{Package} LPA</h3>
                      </div>
                    )
                  })
                } */}
                <div className="companies_div_dashboard">
                  {/* {companiesList.map((company, index) => {
                    return (
                      <>
                        <div className="companies_inner" key={index} onClick={(e) => { handleClick(company.name) }}>
                          <img src={company.icon} className="company_img_dash" />
                          <p className="company_name">{company.name}</p>
                        </div>
                      </>
                    )
                  })

                  } */}

                  {/* {jdData
                    .filter((word) => word.length <= 20)
                    .map((item, index) => {
                      return (
                        <>
                          <div
                            className="flex align-items-center justify-content-center text-slate-100 px-2 py-1 bg-[#373737] hover:bg-[#444444] rounded-lg cursor-pointer"
                            key={index}
                          >
                            <p
                              className="text text-gray font-bold"
                              onClick={() => {
                                navigate("/students");
                              }}
                            >
                              {item}
                            </p>
                          </div>
                        </>
                      );
                    })} */}
                </div>
              </div>
            </div>
            <div className="flex_container2 flex flex-wrap gap-4 md:gap-0 pt-2">
              <div className="flex_item3 w-full md:w-[50%] h-fit md:h-[100%] ">
                <h3 className="dashboard_text">Top 5 Packages</h3>
                <div className="packages_div">
                  {
                    // data.slice(0, 5).map((item, index) => {
                    placedData.slice(0, 5)?.map((item, index) => {
                      const { name, package: packageAmount, companyName, image, year} =  item;
                      // console.log(item);
                      // const profileImg = ProfileLink.slice(33,);

                      return (
                        <div
                          key={index}
                          className="highest_package"
                          onClick={() => {
                            navigate(`/students/${name}`);
                          }}
                        >
                          {/* {profileImg ?
                            <img src={`https://drive.google.com/thumbnail?id=${ProfileLink.slice(33,)}`}
                              className="card_img_dashboard spin circle" alt='Not Found' />
                            : <img src={dummy} alt="pic" className="card_img_dashboard spin circle" />} */}

                          <img
                            src={image}
                            className="card_img_dashboard spin circle"
                            alt="Not Found"
                          />
                          <h3 className="highest_packagetext1">
                            <span className="text-animation">
                              {name.split(" ")[0] +
                                " " +
                                name.split(" ")[name.split(" ").length - 1]}
                            </span>
                            <span className="highest_packagetext2">
                              {companyName}
                            </span>
                          </h3>
                          <h3 className="highest_packagetext2 highest_packagetext3">
                            {packageAmount} LPA{" "}
                            <span className="year_dashboard">{year} Batch</span>{" "}
                            </h3>
                            {/* <span className="year_dashboard">{year} Batch</span>{" "} */}
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              <div className="flex_item4 w-full md:w-[47%] h-fit md:h-[100%] ">
                <h5 className="dashboard_text">Max Packages (LPA)</h5>
                <BarChart
                  width={550}
                  height={300}
                  data={graphData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 30,
                  }}
                >
                  <Tooltip content={<CustomTooltip />} />
                  <XAxis
                    dataKey="name"
                    label={{
                      offset: 15,
                      value: "Academic Years",
                      position: "bottom",
                      fill: "#ffffff",
                    }}
                    stroke="white"
                  />
                  <YAxis
                    stroke="white"
                    label={{
                      value: "Salary (LPA)",
                      angle: -90,
                      position: "insideCenter",
                      fill: "#ffffff",
                      dx: -25,
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#4971FC"
                    barSize={60}
                    label={renderCustomBarLabel}
                  />
                </BarChart>
              </div>
              <div className="div_for_padding"> amsn</div>
            </div>
          </div>
        ) : (
          <div className="loading_div">
            <InternshipLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
