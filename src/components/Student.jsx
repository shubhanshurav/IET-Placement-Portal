// import React, { useEffect, useState } from 'react';
// import '../Styles/Common.css';
// import '../Styles/Student.css';
// import Sidebar from '../components/Sidebar';
// import search from '../Assets/search.png';
// import InternshipLoader from './InternshipLoader';
// import '../Styles/InternshipLoader.css';
// import { useLocation } from 'react-router-dom'
// import sort from '../Assets/sort.png';
// import check from '../Assets/check.png';
// import {placedStudentDetails} from '../data/placedstudentData';
// import { ImMenu, ImCross } from "react-icons/im";

// const Student = ({ data }) => {
//   const location = useLocation();
//   const [placedData, setPlacedData] = useState(placedStudentDetails);

//   const [q, setQ] = useState("");

//   useEffect(() => {
//     setQ(location.state ? location.state.company_selected.data : "");
//   }, [])

//   const [check_flag, setCheckFlag] = useState(0);
//   const [showDiv, setShowDiv] = useState(false);

//   const [isSidebarVisible, setSidebarVisibility] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarVisibility(!isSidebarVisible);
//   };

//   const SortbyName = () => {
//     data.sort((a, b) => {
//       if (a.Name < b.Name) {
//         return -1;
//       } else if (a.Name > b.Name) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//   }
//   const SortbyYear = () => {
//     data.sort((a, b) => {
//       if (a.Year > b.Year) {
//         return -1;
//       } else if (a.Year < b.Year) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//   }
//   const SortbyPackage = () => {
//     data.sort((a, b) => {
//       if (a.Package > b.Package) {
//         return -1;
//       } else if (a.Package < b.Package) {
//         return 1;
//       } else {
//         return 0;
//       }
//     });
//   }

//   const handleCheck1 = (e) => {
//     setCheckFlag(e);
//     SortbyName();
//     setShowDiv(!showDiv);
//   }
//   const handleCheck2 = (e) => {
//     setCheckFlag(e);
//     SortbyYear();
//     setShowDiv(!showDiv);
//   }
//   const handleCheck3 = (e) => {
//     setCheckFlag(e);
//     SortbyPackage();
//     setShowDiv(!showDiv);
//   }

//   const [searchParam] = useState(["Name", "Company", "Skills", "Year"]);

//   function searchItem(items) {
//     return items.filter((item) => {
//       return searchParam.some((newItem) => {
//         return (
//           item[newItem]
//             .toString()
//             .toLowerCase()
//             .indexOf(q.toLowerCase()) > -1
//         );
//       });
//     });
//   }

//   return (
//     <div className='student_div'>
//       {isSidebarVisible && <Sidebar param={'students'} />}
//       <div className="student_div_center w-[96%] m-auto">
//         <div className="">
//            {/* Toggle Button */}
//             <button className="pt-2 z-10 ml-[11rem] md:ml-[13rem] text-white text-2xl bg-richblack-800 rounded"
//             onClick={toggleSidebar}>
//                 {isSidebarVisible ? <ImCross /> : <ImMenu />}
//             </button>
//         </div>
//         <div className="dashboard_top student_searchbar ">
//           <div className="search_bar_div ">
//             <input className='search_bar' onChange={(e) => setQ(e.target.value)} value={q} type='text' placeholder='Seach Companies, Students, or Skills ...' />
//             <div className="search_icon_div">
//               <img src={search} alt="pic" className="search_icon" />
//             </div>
//           </div>
//           <div className='sort_div'>
//             <p className='sort_name' onClick={() => { setShowDiv(!showDiv) }}>sort by</p>
//             <img src={sort} className='sort_img' alt="sortIMG" onClick={() => { setShowDiv(!showDiv) }} />
//             <div className={showDiv ? 'sort_dropdown' : 'sort_dropdown_none'}>
//               <ul className='sort_ul'>
//                 <li className='sort_li' onClick={(e) => { handleCheck1(1) }}>
//                   Name &#42779;
//                   <img src={check} alt="img" className={check_flag === 1 ? 'check_img' : "check_img_none"} />
//                 </li>

//                 <li className='sort_li' onClick={(e) => { handleCheck2(2) }}>
//                   Year &#42780;
//                   <img src={check} alt="img" className={check_flag === 2 ? 'check_img' : "check_img_none"} />
//                 </li>

//                 <li className='sort_li' onClick={(e) => { handleCheck3(3) }}>
//                   Package &#42780;
//                   <img src={check} alt="img" className={check_flag === 3 ? 'check_img' : "check_img_none"} />
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="dashboard_bottom_student">
//           <div className='center_div'>

//             {/* {data.length > 0 ? */}
//             {placedData?.length > 0 ?
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-2 content-start">
//                 {searchItem(placedData)?.length > 0 ? searchItem(placedData).map((item, i) => {
//                   // data.map((item, i) => {
//                   console.log(searchItem(placedData));
//                   const { UID, Name, Company, Jobprofile, Package, ProfileLink, Year } = item;
//                   const ID = UID;
//                   // const profileImg = ProfileLink.slice(33,);
//                   // console.log(Name,profileImg);
//                   return (
//                     // <div className="card" key={i} onClick={()=>{navigate(`/students/${item.name}`)}}>
//                     <a href={`/students/${ID}`} className="card md:max-w-[33%] max-w-[100%] min-w-[275px]" key={i}>
//                       <div className='year_field text-[#beb9b9] bg-[#2c25ffcc]'>{Year}</div>
//                       {/* {profileImg ?
//                         <img src={`https://drive.google.com/thumbnail?id=${ProfileLink.slice(33,)}`}
//                           className="card_img" alt='Not Found' />
//                         : <img src={dummy} alt="pic" className="card_img" />} */}
//                         <img src={ProfileLink} className="card_img" alt='Not Found' />
//                       <div className='card-details h-[200px] md:h-[210px]'>
//                         <p className="card_student_name pt-[20px]">{Name}</p>
//                         <p className="card_company_name pt-[5px]">{Company}</p>
//                         <p className="card_company_role pt-[5px]"><span className='card_span'>Role:</span> {Jobprofile}</p>
//                         <p className="card_student_skills py-[5px]"><span className='card_span'>Package :</span>  {Package} LPA</p>
//                       </div>
//                     </a>
//                   )
//                 })
//                   :
//                   <div className='center_div'>
//                     <h3 className='no_Records text-2xl'>No Records Found!</h3>
//                   </div>
//                 }
//               </div>
//               :
//               <div className='loading_div'>
//                 <InternshipLoader />
//               </div>
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Student

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function StudentCards() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [editStudent, setEditStudent] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [studentToDelete]);

  useEffect(() => {
    filterStudents();
  }, [yearFilter, departmentFilter,studentToDelete]);

  const fetchStudents = () => {
    fetch(BASE_URL + "/placed")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.responseDetails) {
          setStudents(data.responseDetails);
          setFilteredStudents(data.responseDetails);
        } else {
          console.error("Invalid data structure from API");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const filterStudents = () => {
    let filtered = students;

    if (yearFilter) {
      filtered = filtered.filter((student) => student.year === yearFilter);
    }

    if (departmentFilter) {
      filtered = filtered.filter(
        (student) => student.department === departmentFilter
      );
    }

    setFilteredStudents(filtered);
  };

  const handleEdit = (student) => {
    setEditStudent(student);
  };

  const confirmDelete = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };

  const handleConfirmDelete = () => {
    fetch(`${BASE_URL}/placed/${studentToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setStudents(
            students.filter((student) => student.id !== studentToDelete)
          );
          setFilteredStudents(
            filteredStudents.filter((student) => student.id !== studentToDelete)
          );
          toast.success("Student deleted successfully");
        } else {
          toast.error("Failed to delete student");
        }
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student");
      })
      .finally(() => {
        setShowDeleteConfirm(false);
        setStudentToDelete(null);
      });
  };

  const handleSaveEdit = () => {
    fetch(`${BASE_URL}/placed/${editStudent._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editStudent),
    })
      .then((response) => {
        if (response.ok) {
          fetchStudents();
          setEditStudent(null);
          toast.success("Student updated successfully");
        } else {
          toast.error("Failed to update student");
        }
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        toast.error("Failed to update student");
      });
  };

  return (
    <div className="student-cards  bg-slate-800">
      <div className=''>
         <Navbar ShowBtn={true}/>
       </div>
      <h2 className="text-4xl font-bold mb-8 text-center border-b-4 border-white w-fit m-auto pt-6 text-white">
        Placed Students
      </h2>
      <ToastContainer />

      <div className="filters flex justify-center mb-8 space-x-4">
        <div>
          <label className="block text-white mb-2">Year</label>
          <select
            className="p-2 rounded"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(students.map((student) => student.year))].map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label className="block text-white mb-2">Department</label>
          <select
            className="p-2 rounded"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All</option>
            {[...new Set(students.map((student) => student.department))].map(
              (dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 py-6 gap-6">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-lg p-6">
              <img
                src={student.image}
                alt={student.name}
                className="w-44 h-44 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-center">
                {student.name}
              </h3>
              <p className="text-gray-700 mb-2 text-center">
                Company: {student.companyName}
              </p>
              <p className="text-gray-700 mb-2 text-center">
                Package: {student.package}
              </p>
              <p className="text-gray-700 mb-2 text-center">
                Year: {student.year}
              </p>
              <p className="text-gray-700 mb-2 text-center">
                Department: {student.department}
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => confirmDelete(student._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No students found</p>
        )}
      </div>


      {/* Model UI for deletion confirmation */}
      {showDeleteConfirm && (
        <div className="delete-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editStudent && (
        <div className="edit-modal pt-20 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 overflow-y-scroll w-[30%] h-[85%] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="p-2 rounded mb-4 w-full"
              value={editStudent.name}
              onChange={(e) =>
                setEditStudent({ ...editStudent, name: e.target.value })
              }
            />
            <label className="block mb-2">Company</label>
            <input
              type="text"
              className="p-2 rounded mb-4 w-full"
              value={editStudent.companyName}
              onChange={(e) =>
                setEditStudent({ ...editStudent, companyName: e.target.value })
              }
            />
            <label className="block mb-2">Package</label>
            <input
              type="text"
              className="p-2 rounded mb-4 w-full"
              value={editStudent.package}
              onChange={(e) =>
                setEditStudent({ ...editStudent, package: e.target.value })
              }
            />
            <label className="block mb-2">Year</label>
            <input
              type="text"
              className="p-2 rounded mb-4 w-full"
              value={editStudent.year}
              onChange={(e) =>
                setEditStudent({ ...editStudent, year: e.target.value })
              }
            />
            <label className="block mb-2">Department</label>
            <input
              type="text"
              className="p-2 rounded mb-4 w-full"
              value={editStudent.department}
              onChange={(e) =>
                setEditStudent({ ...editStudent, department: e.target.value })
              }
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setEditStudent(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSaveEdit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCards;
