import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const CertificationForm = () => {
  const [name, setName] = useState('');
  const [certificateName, setCertificateName] = useState('');
  const [image, setImage] = useState(null);

    // Function to reset the form fields
    const resetForm = () => {
      setName('');
      setCertificateName('');
      setImage(null);
    };
  

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('certificateName', certificateName);
    formData.append('image', image);

    try {
      const res = await axios.post(BASE_URL+'/certificates', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data.success);
      if (res.data.success) {
        toast.success('certificate added successfully');
        resetForm();
      } else {
        toast.error('Failed to add certificate');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while adding the certificate');
    }
  };

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md md:w-[60%] w-fit ">
      <h1 className="text-xl md:text-3xl font-bold text-black border-b-4 border-black w-fit m-auto mb-4">Student Placement Form</h1>
      <form onSubmit={onSubmit} className=''>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Certificate Name</label>
          <input
            type="text"
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
      
        <div className="mb-4">
          <label className="block text-gray-700">Certificate Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CertificationForm;
