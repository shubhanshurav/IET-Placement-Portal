import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [packageAmount, setPackageAmount] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('department', department);
    formData.append('companyName', companyName);
    formData.append('package', packageAmount);
    formData.append('year', year);
    formData.append('image', image);

    try {
      const res = await axios.post('https://placement-portal-backend-rweo.onrender.com/api/v1/placed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data.success);
      if (res.data.success) {
        alert('Student added successfully');
      } else {
        alert('Failed to add student');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while adding the student');
    }
  };

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md w-[60%]">
      <h1 className="text-3xl font-bold text-black border-b-4 border-black w-fit m-auto mb-4">Student Placement Form</h1>
      <form onSubmit={onSubmit} className=''>
        <div className="mb-3">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Package</label>
          <input
            type="text"
            value={packageAmount}
            onChange={(e) => setPackageAmount(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Student Image</label>
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
    </div>
  );
};

export default StudentForm;
