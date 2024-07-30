import Home from "./Pages/Home";
import Main from "./Pages/Main";
import "./App.css";
import { Routes, Route, Form } from "react-router-dom";
import Student from "./components/Student";
import Dashboard from "./components/Dashboard";
import Company from "./components/Company";
import Internship from "./components/Internship";
import Hackathon from "./components/Hackathon";
import Profile from "./components/Profile";
import Login from "./components/Login";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react";
import Demo from "./components/Demo";
import { hackathons } from "./data/hackathons.js";

import { get, ref, set, push, getDatabase } from "firebase/database";
import { useState, useEffect } from "react";
import { database, auth } from "../src/firebaseConfig.js";
import Admin from "./components/Admin.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import { placedStudentDetails } from "./data/placedstudentData.js";
import { internshipDetails } from "./data/internshipDetails";
import StudentUploadDetails from "./Pages/PlacedStudent/StudentUploadDetails.jsx";
import InternshipUploadDetails from "./Pages/Internship/InternshipUploadDetails.jsx";
import CertificatesUploadDetails from "./Pages/CertificateDetails/CertificatesUploadDetails.jsx";
import GateStudentUploadDetails from "./Pages/GateStudent/GateStudentUploadDetails.jsx";
import Certificate from "./components/Certificate.jsx";
import GateStudent from "./components/GateStudent.jsx";

function App() {


  const [studentsData, setStudents] = useState(placedStudentDetails);
  const [internship, setInternship] = useState(internshipDetails);
  const [hackathonsData, setHackathonsaData] = useState(hackathons);
  const [loading, setLoading] = useState(true);

  let authUser = localStorage.getItem("user");

  const AddData = async () => {
    const dataRef = push(ref(database, "Analytics"));
    set(dataRef, {
      total_students: 100,
      total_companies: 50, 
      placd_students: 10,
    })
      .then(() => {
        console.log("data saved");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // const fetchData = async () => {
  //   const studentsRef = ref(database, 'Students');
  //   get(studentsRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       const studentsArray = Object.entries(snapshot.val()).map(([id, data]) => ({
  //         id, ...data,
  //       }));
  //       setStudents(studentsArray);
  //     }
  //     else {
  //       console.log("No Data Available!");
  //     }
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }
  // useEffect(() => {
  //   getInternshipData();
  //   fetchData();
  // }, []);

  //Hackathon
  //  const hackathon_url = 'https://script.google.com/macros/s/AKfycbwl5PJp8hDfarVc5s0hHU0Lws42aAEPtam2oedJZQX4b-fZOM7Oq0gSzzSUFpqXIMnv/exec';
  //  const [hackathons, setHackathons] = useState([]);
  //  const [loading, setLoading] = useState(true);

  //  async function fetchHackathonData() {
  //    setLoading(true);
  //    let response = await fetch(hackathon_url);
  //    let data = await response.json();
  //    setHackathons(data.data);
  //   //  console.log(data.data);
  //    setLoading(false);
  //  }

  //  useEffect(() => {
  //    fetchHackathonData();
  //  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard data={studentsData} />} />
        <Route path="/students" element={<Student data={studentsData} />} />
        <Route path="/certificates" element={<Certificate  />} />
        <Route path="/gate" element={<GateStudent />} />
        <Route path="/companies" element={<Company data={studentsData} />} />
        <Route path="/uploadStudentsDetails" element={<StudentUploadDetails />} />
        <Route path="/uploadCertificateDetails" element={<CertificatesUploadDetails />} />
        <Route path="/uploadGateStudentDetails" element={<GateStudentUploadDetails />} />
        <Route path="/uploadInternshipDetails" element={<InternshipUploadDetails />} />
        <Route
          path="/hackathons"
          element={
            <Hackathon
              hackathonsData={hackathonsData}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route
          path="/internship"
          element={<Internship loading={loading} setLoading={setLoading} />}
        />
        <Route path="/students/:ID" element={<Profile data={studentsData} />} />
        <Route path="*" element={<Home />} />

        {authUser ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
