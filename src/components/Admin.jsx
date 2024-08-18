import React from "react";
import "../Styles/Admin.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { get, set, ref } from "firebase/database";
import { useState, useEffect } from "react";
import { auth, database } from "../firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        toast.success("Logged Out");
        setTimeout(() => {
          navigate("/dashboard");
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        toast.error("Something went Wrong!");
      });
  };

  let date = new Date();

  // -------------------------------------------------------------------------------
  // placement statistics

  const [statData, setStatData] = useState({
    totalStudents: "",
    totalCompanies: "",
    placedStudents: "",
    averagePackage: "",
  });

  const handelChange1 = (e) => {
    const { name, value } = e.target;
    setStatData({ ...statData, [name]: value });
  };

  const get_stats = async () => {
    const studentsRef = ref(database, "dashboard/statistics");
    const snapshot = await get(studentsRef);
    if (snapshot.exists()) {
      const curr_data = Object.values(snapshot.val());
      setStatData(curr_data[0]);
    } else {
      toast.error("Error Fecthing Statistics!");
    }
  };

  const updateData1 = (e) => {
    e.preventDefault();
    const newDataRef = ref(database, "dashboard/statistics");
    set(newDataRef, {
      data: {
        totalStudents: statData.totalStudents,
        placedStudents: statData.placedStudents,
        totalCompanies: statData.totalCompanies,
        averagePackage: statData.averagePackage,
      },
    })
      .then(() => {
        toast.success("Data Saved Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------

  // highest packages
  const [curr_package, setPackage] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
  });

  const handelChange2 = (e) => {
    const { name, value } = e.target;
    setPackage({ ...curr_package, [name]: value });
  };

  const get_graphData2 = async () => {
    const studentsRef = ref(database, "dashboard/maxPackages");
    const snapshot = await get(studentsRef);
    if (snapshot.exists()) {
      let cur_pack = Object.values(snapshot.val());
      setPackage(cur_pack[0]);
    } else {
      toast.error("Error Fecthing MaxPackages!");
    }
  };

  const updateData2 = (e) => {
    e.preventDefault();
    const newDataRef = ref(database, "dashboard/maxPackages");
    set(newDataRef, {
      data: {
        value1: curr_package.value1,
        value2: curr_package.value2,
        value3: curr_package.value3,
        value4: curr_package.value4,
        value5: curr_package.value5,
      },
    })
      .then(() => {
        toast.success("Data Saved Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------

  // placement percentages
  const [curr_percentage, setPercentages] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
  });

  const handelChange3 = (e) => {
    const { name, value } = e.target;
    setPercentages({ ...curr_percentage, [name]: value });
  };

  const get_graphData3 = async () => {
    const studentsRef = ref(database, "dashboard/placementPercentage");
    const snapshot = await get(studentsRef);
    if (snapshot.exists()) {
      let cur_pack = Object.values(snapshot.val());
      setPercentages(cur_pack[0]);
    } else {
      toast.error("Error Fecthing Percentages!");
    }
  };

  const updateData3 = (e) => {
    e.preventDefault();
    const newDataRef = ref(database, "dashboard/placementPercentage");
    set(newDataRef, {
      data: {
        value1: curr_percentage.value1,
        value2: curr_percentage.value2,
        value3: curr_percentage.value3,
        value4: curr_percentage.value4,
        value5: curr_percentage.value5,
      },
    })
      .then(() => {
        toast.success("Data Saved Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------

  // no of companies visited
  const [curr_companies, setCompanies] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
  });

  const handelChange4 = (e) => {
    const { name, value } = e.target;
    setCompanies({ ...curr_companies, [name]: value });
  };

  const get_graphData4 = async () => {
    const studentsRef = ref(database, "dashboard/companiesVisited");
    const snapshot = await get(studentsRef);
    if (snapshot.exists()) {
      let cur_pack = Object.values(snapshot.val());
      setCompanies(cur_pack[0]);
    } else {
      toast.error("Error Fecthing Companies Data!");
    }
  };

  const updateData4 = (e) => {
    e.preventDefault();
    const newDataRef = ref(database, "dashboard/companiesVisited");
    set(newDataRef, {
      data: {
        value1: curr_companies.value1,
        value2: curr_companies.value2,
        value3: curr_companies.value3,
        value4: curr_companies.value4,
        value5: curr_companies.value5,
      },
    })
      .then(() => {
        toast.success("Data Saved Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------

  // median salary
  const [curr_median, setMedian] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
  });

  const handelChange5 = (e) => {
    const { name, value } = e.target;
    setMedian({ ...curr_median, [name]: value });
  };

  const get_graphData5 = async () => {
    const studentsRef = ref(database, "dashboard/medianSalary");
    const snapshot = await get(studentsRef);
    if (snapshot.exists()) {
      let cur_pack = Object.values(snapshot.val());
      setMedian(cur_pack[0]);
    } else {
      toast.error("Error Fecthing Median Salaries!");
    }
  };

  const updateData5 = (e) => {
    e.preventDefault();
    const newDataRef = ref(database, "dashboard/medianSalary");
    set(newDataRef, {
      data: {
        value1: curr_median.value1,
        value2: curr_median.value2,
        value3: curr_median.value3,
        value4: curr_median.value4,
        value5: curr_median.value5,
      },
    })
      .then(() => {
        toast.success("Data Saved Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // -------------------------------------------------------------------------------

  // -------------------------------------------------------------------------------

  useEffect(() => {
    get_stats(); // statistics
    get_graphData2(); // highest package
    get_graphData3(); //placement percentages
    get_graphData4(); // companies
    get_graphData5(); // median salary
  }, []);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <div className="flex-column justify-content-center align-items-start bg-[#222222] h-full w-full">
        <nav className="relative flex flex-wrap items-center justify-between bg-[#373737] p-3">
          <div className="flex flex-row py-2">
            <p className="text-[#000000] border-3 border-[#f8b217] bg-[#f8b217] p-2 rounded-md font-bold text-[14px] md:text-[18px] m-auto">
              Admin Dashboard
            </p>
            <div className="relative inline-block text-left m-auto px-8">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-white shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="options-menu"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Add Student Details
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1" role="none">
                    <p
                      className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300"
                      onClick={() => navigate("/uploadStudentsDetails")}
                    >
                      Add Student
                    </p>
                    <p
                      className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300"
                      onClick={() => navigate("/uploadCertificateDetails")}
                    >
                      Add Certificates
                    </p>
                    <p
                      className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300"
                      onClick={() => navigate("/uploadGateStudentDetails")}
                    >
                      Add Gate Students
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <Link
              to={"/dashboard"}
              class="font-bold pr-4 text-white dark:text-white-500 hover:underline"
            >
              Go back to Dashboard
            </Link>
            <button
              type="button"
              class="text-white bg-blue-700 pr-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-full text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={(e) => {
                handleLogout();
              }}
            >
              Sign Out
            </button>
          </div>
        </nav>
        <div className="admin_container flex flex-col md:flex-row w-full">
          {/* highest_package graph data */}
          <div className="statistics_div">
            <h2 className="font-bold text-center text-2xl p-3 text-[#f8b217]">
              Highest Packages{" "}
            </h2>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 4} :
              </p>
              <input
                type="text"
                onChange={handelChange2}
                value={curr_package.value1}
                name="value1"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 3} :
              </p>
              <input
                type="text"
                onChange={handelChange2}
                value={curr_package.value2}
                name="value2"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 2} :
              </p>
              <input
                type="text"
                onChange={handelChange2}
                value={curr_package.value3}
                name="value3"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 1} :
              </p>
              <input
                type="text"
                onChange={handelChange2}
                value={curr_package.value4}
                name="value4"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear()} :
              </p>
              <input
                type="text"
                onChange={handelChange2}
                value={curr_package.value5}
                name="value5"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="w-100 pt-1 flex justify-content-center items-center">
              <button
                onClick={updateData2}
                type="button"
                class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Data
              </button>
            </div>
          </div>

          {/* percentages data */}
          <div className="statistics_div">
            <h2 className="font-bold text-center text-2xl p-3 text-[#f8b217]">
              Placement Percentages{" "}
            </h2>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 4} :
              </p>
              <input
                type="text"
                onChange={handelChange3}
                value={curr_percentage.value1}
                name="value1"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 3} :
              </p>
              <input
                type="text"
                onChange={handelChange3}
                value={curr_percentage.value2}
                name="value2"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 2} :
              </p>
              <input
                type="text"
                onChange={handelChange3}
                value={curr_percentage.value3}
                name="value3"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 1} :
              </p>
              <input
                type="text"
                onChange={handelChange3}
                value={curr_percentage.value4}
                name="value4"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear()} :
              </p>
              <input
                type="text"
                onChange={handelChange3}
                value={curr_percentage.value5}
                name="value5"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="w-100 pt-1 flex justify-content-center items-center">
              <button
                onClick={updateData3}
                type="button"
                class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Data
              </button>
            </div>
          </div>

          {/* companies data */}
          <div className="statistics_div">
            <h2 className="font-bold text-center text-2xl p-3 text-[#f8b217]">
              No. of Companies Visited{" "}
            </h2>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 4} :
              </p>
              <input
                type="text"
                onChange={handelChange4}
                value={curr_companies.value1}
                name="value1"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 3} :
              </p>
              <input
                type="text"
                onChange={handelChange4}
                value={curr_companies.value2}
                name="value2"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 2} :
              </p>
              <input
                type="text"
                onChange={handelChange4}
                value={curr_companies.value3}
                name="value3"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 1} :
              </p>
              <input
                type="text"
                onChange={handelChange4}
                value={curr_companies.value4}
                name="value4"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear()} :
              </p>
              <input
                type="text"
                onChange={handelChange4}
                value={curr_companies.value5}
                name="value5"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="w-100 pt-1 flex justify-content-center items-center">
              <button
                onClick={updateData4}
                type="button"
                class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Data
              </button>
            </div>
          </div>
          {/* median salary data */}
          <div className="statistics_div">
            <h2 className="font-bold text-center text-2xl p-3 text-[#f8b217]">
              Median Salary{" "}
            </h2>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 4} :
              </p>
              <input
                type="text"
                onChange={handelChange5}
                value={curr_median.value1}
                name="value1"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 3} :
              </p>
              <input
                type="text"
                onChange={handelChange5}
                value={curr_median.value2}
                name="value2"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 2} :
              </p>
              <input
                type="text"
                onChange={handelChange5}
                value={curr_median.value3}
                name="value3"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear() - 1} :
              </p>
              <input
                type="text"
                onChange={handelChange5}
                value={curr_median.value4}
                name="value4"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">
                Year {date.getFullYear()} :
              </p>
              <input
                type="text"
                onChange={handelChange5}
                value={curr_median.value5}
                name="value5"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="w-100 pt-1 flex justify-content-center items-center">
              <button
                onClick={updateData5}
                type="button"
                class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Data
              </button>
            </div>
          </div>
          {/* placement statistics data */}
          <div className="statistics_div">
            <h2 className="text-center font-bold text-2xl p-3 text-[#f8b217]">
              Placement Statistics{" "}
              <span className="text-white font-medium">
                ({date.getFullYear() - 1})
              </span>{" "}
            </h2>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">Total Students : </p>
              <input
                type="text"
                onChange={handelChange1}
                value={statData.totalStudents}
                name="totalStudents"
                id="first_name"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">Total Companies : </p>
              <input
                type="text"
                onChange={handelChange1}
                value={statData.totalCompanies}
                name="totalCompanies"
                id="first_name"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">Placed Students : </p>
              <input
                type="text"
                onChange={handelChange1}
                value={statData.placedStudents}
                name="placedStudents"
                id="first_name"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="p-2 ps-3 pe-3 flex justify-content-between align-items-center">
              <p className="text text-white text-xl">Average Package : </p>
              <input
                type="text"
                onChange={handelChange1}
                value={statData.averagePackage}
                name="averagePackage"
                id="first_name"
                class="inp_field cursor-pointer border border-gray-300 w-25 text-white text-sm rounded-full focus:ring-blue-500 outline-none focus:border-blue-500 block p-2 ps-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="w-100 pt-1 flex justify-content-center items-center">
              <button
                onClick={updateData1}
                type="button"
                class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Save Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='bg-[#222222] flex h-screen w-screen justify-content-center align-items-center align-content-center'>
                    <div className='flex-column justify-center items-center'>
                        <p className='text-white font-bold text-xl'>Login as Admin to access Admin Dashboard</p>
                        <div className='flex justify-content-center align-items-center'>
                        <button
                            type="button"
                            onClick={()=>{navigate('/')}}
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                            class="me-3 mt-4 font-bold inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            Go to Home
                        </button>
                        </div>
                    </div>
                </div> */}
    </>
  );
};

export default Admin;
