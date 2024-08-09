import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import { ImMenu, ImCross } from "react-icons/im";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [newName, setNewName] = useState("");
  const [newCertificateName, setNewCertificateName] = useState("");
  const [newCertificateImage, setNewCertificateImage] = useState(null);

  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = () => {
    fetch(BASE_URL + "/certificates")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.responseDetails) {
          setCertificates(data.responseDetails);
        } else {
          console.error("Invalid data structure from API");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDelete = (id) => {
    fetch(`${BASE_URL}/certificates/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Certificate deleted successfully");
          fetchCertificates();
        } else {
          toast.error("Failed to delete certificate");
        }
      })
      .catch((error) => {
        toast.error("Error deleting certificate:", error);
      });
  };

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);
    setNewName(certificate.name)
    setNewCertificateName(certificate.certificateName);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    // formData.append("name", editingCertificate.name);
    formData.append("name", newName);
    formData.append("certificateName", newCertificateName);
    if (newCertificateImage) {
      formData.append("image", newCertificateImage);
    }

    fetch(`${BASE_URL}/certificates/${editingCertificate._id}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Certificate updated successfully");
          setEditingCertificate(null);
          fetchCertificates();
        } else {
          toast.error("Failed to update certificate");
        }
      })
      .catch((error) => {
        toast.error("Error updating certificate:", error);
      });
  };

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
      <div className="student-cards p-4 bg-slate-950">
        <ToastContainer />
        <h2 className="text-3xl text-white border-b-4 w-fit m-auto pb-2 border-white font-bold mb-8 text-center">
          Students Certificates
        </h2>
        <div className="grid pt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certificates.length > 0 ? (
            certificates.map((certificate) => (
              <div key={certificate._id} className="bg-gray-100 rounded-lg shadow-lg py-6">
                <img
                  src={certificate.image}
                  alt={certificate.name}
                  className="w-60 h-40 object-cover rounded-sm mx-auto mb-4"
                />
                <h3 className="text-xl  font-semibold mb-2 text-center">
                  {certificate.name}
                </h3>
                <p className=" mb-2 text-center">
                  Certificate Name: {certificate.certificateName}
                </p>
                <div className="text-center">
                  <Link
                    to={certificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 font-bold border-b-2 border-blue-800"
                  >
                    View Certificate
                  </Link>
                </div>
                <div className="flex justify-around mt-4">
                  <button
                    onClick={() => handleEdit(certificate)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(certificate._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
                {editingCertificate && editingCertificate._id === certificate._id && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Update Name"
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="text"
                      value={newCertificateName}
                      onChange={(e) => setNewCertificateName(e.target.value)}
                      placeholder="Update Certificate Name"
                      className="border p-2 mb-2 w-full"
                    />
                    <input
                      type="file"
                      onChange={(e) => setNewCertificateImage(e.target.files[0])}
                      className="border p-2 mb-2 w-full"
                    />
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No Certificates found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Certificate;
